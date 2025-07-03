


import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { useGetAllCustomersQuery } from '../../redux/apis/customer.api';
import { useGetAllProductsQuery } from '../../redux/apis/product.api';
import { useCreatePaymentMutation } from '../../redux/apis/payment.api';
import Loader from '../../components/ui/Loader';
import { useRef } from "react";
import Receipt from './Receipt';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";






const paymentSchema = z.object({
    customerId: z.string().nonempty("Customer is required"),
    products: z.array(
        z.object({
            productId: z.string().nonempty("Product is required"),
            quantity: z.number().min(1, "Quantity must be at least 1"),
        })
    ).min(1, "At least one product is required"),
    paidAmount: z.number().min(0, "Paid amount must be a positive number"),
    paymentMode: z.enum(['Cash', 'UPI', 'Bank Transfer', 'Credit', 'Other']),
});

type PaymentFormSchema = z.infer<typeof paymentSchema>
function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const PaymentPage = () => {
    const { data: customers } = useGetAllCustomersQuery({});
    const [receiptData, setReceiptData] = useState<any>(null);

    const { data: products, refetch } = useGetAllProductsQuery({});

    const [createPayment, { isSuccess: isAddSuccess, isError, isLoading }] = useCreatePaymentMutation();
    const searchMobileRef = useRef<HTMLInputElement>(null);
    const searchProductRef = useRef<HTMLInputElement>(null);


    const navigate = useNavigate();
    const [searchMobile, setSearchMobile] = useState('');
    const [searchProduct, setSearchProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const debouncedSearchMobile = useDebounce(searchMobile, 400);
    const debouncedSearchProduct = useDebounce(searchProduct, 400);

    const [openReceiptModal, setOpenReceiptModal] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control, reset,
        formState: { errors },
    } = useForm<PaymentFormSchema>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            customerId: '',
            products: [], paidAmount: 0, paymentMode: 'Cash',
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'products'
    });
    const watchProducts = watch('products');
    const paidAmount = watch('paidAmount');

    const searchTerm = debouncedSearchMobile.trim().toLowerCase();

    const filteredCustomers = customers?.result?.filter((cust) =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.mobile?.includes(searchTerm)
    ) || [];



    const filteredProducts = products?.result?.filter(
        (prod) =>
            prod.name.toLowerCase().includes(debouncedSearchProduct.toLowerCase()) ||
            prod.description?.toLowerCase().includes(debouncedSearchProduct.toLowerCase())
    ) || [];



    const getProductDetails = (id: string) => {
        return products?.result?.find((prod) => prod._id === id);
    };







    const onSubmit = async (data: any) => {
        const totalAmount = data.products.reduce((sum: any, item: any) => {
            const product = getProductDetails(item.productId);
            return sum + (product?.price || 0) * item.quantity;
        }, 0);

        const pendingAmount = totalAmount - data.paidAmount;

        try {
            const res = await createPayment({
                customer: data.customerId,
                products: data.products.map((p: any) => ({
                    product: p.productId,
                    quantity: p.quantity,
                    price: getProductDetails(p.productId)?.price || 0
                })),
                totalAmount: totalAmount.toString(),
                paidAmount: data.paidAmount.toString(),
                pendingAmount: pendingAmount.toString(),
                paymentMode: data.paymentMode,
                paymentStatus:
                    data.paidAmount === totalAmount
                        ? 'Paid'
                        : data.paidAmount === 0
                            ? 'Unpaid'
                            : 'Partial'
            }).unwrap();

            setReceiptData(res.result);
            setOpenReceiptModal(true);
            toast.success("Payment added successfully");

            reset({
                customerId: '',
                products: [],
                paidAmount: 0,
                paymentMode: 'Cash',
            });
            setSelectedCustomer(null);
            setSearchMobile('');
            setSearchProduct('');
        } catch (err) {
            toast.error("Failed to save payment");
        }
    };

    const totalAmount = watchProducts.reduce((sum, p) => {
        const prod = getProductDetails(p.productId);
        return sum + (prod?.price || 0) * p.quantity;
    }, 0);

    const totalProductCount = watchProducts.reduce((sum, p) => sum + p.quantity, 0);
    const pendingAmount = totalAmount - paidAmount;


    useEffect(() => {
        if (filteredCustomers.length === 1) {
            const singleCustomer = filteredCustomers[0];
            if (singleCustomer._id !== selectedCustomer?._id) {
                setValue('customerId', singleCustomer._id ?? '');
                setSelectedCustomer(singleCustomer);
            }
        } else {
            if (selectedCustomer !== null) {
                setValue('customerId', '');
                setSelectedCustomer(null);
            }
        }
    }, [debouncedSearchMobile, filteredCustomers]);




    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Payment added successfully');

            setOpenReceiptModal(true);

            reset({
                customerId: '',
                products: [],
                paidAmount: 0,
                paymentMode: 'Cash',
            });

            setSelectedCustomer(null);
            setSearchMobile('');
            setSearchProduct('');
        }
    }, [isAddSuccess]);






    useEffect(() => {
        if (isError) {
            toast.error('Failed to save payment');

        }
    }, [isError,]);
    if (isLoading) return <Loader />;
    return (
        <Card className="max-w-4xl mx-auto mt-5 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-center">
                <div className="border rounded p-3 shadow-sm bg-blue-50">
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="font-semibold text-lg">{totalProductCount}</p>
                </div>
                <div className="border rounded p-3 shadow-sm bg-green-50">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-semibold text-lg">₹{totalAmount}</p>
                </div>
                <div className="border rounded p-3 shadow-sm bg-yellow-50">
                    <p className="text-sm text-gray-500">Paid Amount</p>
                    <p className="font-semibold text-lg">₹{paidAmount}</p>
                </div>
                <div className="border rounded p-3 shadow-sm bg-red-50">
                    <p className="text-sm text-gray-500">Pending Amount</p>
                    <p className="font-semibold text-lg">₹{pendingAmount}</p>
                </div>
            </div>


            <CardHeader>
                <CardTitle>Add Payment</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <Label>Search by Name or Mobile</Label>

                            <Input
                                value={searchMobile}
                                onChange={(e) => {
                                    setSearchMobile(e.target.value);
                                    setSelectedCustomer(null);
                                }}
                                placeholder="Enter name or mobile"
                                ref={searchMobileRef}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Tab') {
                                        e.preventDefault();
                                        searchProductRef.current?.focus();
                                    }
                                }}
                            />

                            {searchMobile && filteredCustomers.length === 0 && !selectedCustomer && (
                                <p className="text-red-500 mt-1">Customer not found</p>
                            )}

                            {searchMobile && filteredCustomers.length > 0 && !selectedCustomer && (
                                <div className="border rounded mt-2 max-h-40 overflow-y-auto bg-white shadow z-10 absolute w-full z-50">
                                    {filteredCustomers.map((cust) => (
                                        <div
                                            key={cust._id}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedCustomer(cust);
                                                setValue('customerId', cust._id ?? '');
                                                setSearchMobile(cust.name);
                                            }}
                                        >
                                            {cust.name} ({cust.mobile})
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        <div className="w-1/2">
                            <Label>Customer</Label>
                            <select
                                {...register('customerId')}
                                className="w-full border rounded px-2 py-1"
                                onChange={(e) => {
                                    const selected = filteredCustomers.find((c) => c._id === e.target.value);
                                    setSelectedCustomer(selected || null);
                                    setValue('customerId', e.target.value);

                                }}
                                value={watch('customerId')}
                            >
                                <option value="">Select Customer</option>
                                {filteredCustomers.map((cust) => (
                                    <option key={cust._id} value={cust._id}>
                                        {cust.name} ({cust.mobile})
                                    </option>
                                ))}
                            </select>
                            {errors.customerId && <p className="text-red-500">{errors.customerId.message}</p>}
                        </div>
                    </div>

                    {selectedCustomer && (
                        <div className="border p-3 rounded bg-gray-50">
                            <p><strong>Name:</strong> {selectedCustomer.name}</p>
                            <p><strong>Mobile:</strong> {selectedCustomer.mobile}</p>
                            <p><strong>Address:</strong> {selectedCustomer.address}</p>
                        </div>
                    )}

                    <div>
                        <Label>Search Product</Label>
                        <Input
                            type="text"
                            placeholder="Search by name or description"
                            value={searchProduct}
                            onChange={(e) => setSearchProduct(e.target.value)}
                            ref={searchProductRef}



                        />

                        {searchProduct && (
                            <div className="border rounded mt-2 max-h-40 overflow-y-auto bg-white shadow z-10">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => {
                                        const isOutOfStock = product.stock === 0;
                                        return (
                                            <div
                                                key={product._id}
                                                className={`px-3 py-2 ${isOutOfStock ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
                                                    }`}
                                                onClick={() => {
                                                    if (!isOutOfStock) {
                                                        append({ productId: product._id, quantity: 1 });
                                                        setSearchProduct('');
                                                    }
                                                }}
                                            >
                                                {product.name} (₹{product.price}) Batch: {product.batchNumber} Stock:{product.stock}
                                                {isOutOfStock && ' - 🚫 Out of Stock'}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="px-3 py-2 text-gray-500 italic">🚫 No matching products found</div>
                                )}
                            </div>
                        )}


                    </div>

                    <div className="space-y-4 mt-2">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-center">
                                <div className="w-1/2">
                                    <Label>Product</Label>
                                    <select {...register(`products.${index}.productId`)} className="w-full border rounded px-2 py-1">
                                        <option value="">Select Product</option>
                                        {products?.result?.map((prod) => (
                                            <option key={prod._id} value={prod._id}>
                                                {prod.name} (₹{prod.price})
                                            </option>
                                        ))}
                                    </select>









                                </div>

                                <div>
                                    <Label>Qty</Label>
                                    <Input type="number" {...register(`products.${index}.quantity`, { valueAsNumber: true })} min={1} />
                                </div>

                                <div>
                                    <Button
                                        className="mt-2 bg-red-600"
                                        type="button"
                                        variant="destructive"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}


                        <Button
                            type="button"
                            onClick={() => append({ productId: '', quantity: 1 })}
                            className="mt-2 bg-blue-500"
                        >
                            + Add Product
                        </Button>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="w-1/3">
                            <Label>Paid Amount</Label>
                            <Input type="number" {...register('paidAmount', { valueAsNumber: true })} />
                            {errors.paidAmount && <p className="text-red-500">{errors.paidAmount.message}</p>}
                        </div>
                        <div className="w-1/3">
                            <Label>Total Amount</Label>
                            <p className="border p-2 rounded">
                                ₹
                                {watchProducts.reduce((sum, p) => {
                                    const prod = getProductDetails(p.productId);
                                    return sum + (prod?.price || 0) * p.quantity;
                                }, 0)}
                            </p>
                        </div>
                        <div className="w-1/3">
                            <Label>Pending Amount</Label>
                            <p className="border p-2 rounded">
                                ₹
                                {(() => {
                                    const total = watchProducts.reduce((sum, p) => {
                                        const prod = getProductDetails(p.productId);
                                        return sum + (prod?.price || 0) * p.quantity;
                                    }, 0);
                                    return total - paidAmount;
                                })()}
                            </p>
                        </div>
                    </div>

                    <div>
                        <Label>Payment Mode</Label>
                        <div className="flex gap-4 mt-2">
                            {['Cash', 'UPI', 'Bank Transfer', 'Credit', 'Other'].map((mode) => (
                                <label key={mode} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value={mode}
                                        {...register('paymentMode')}
                                        className="accent-blue-600"
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                        {errors.paymentMode && <p className="text-red-500">{errors.paymentMode.message}</p>}
                    </div>


                    <Button
                        type="submit"
                        className="mt-4 bg-green-600"
                    >
                        Submit Payment
                    </Button>

                </form>
                {/* <Dialog open={openReceiptModal} onOpenChange={setOpenReceiptModal}>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                        <Receipt onClose={() => setOpenReceiptModal(false)} />
                    </DialogContent>
                </Dialog> */}
                <Dialog open={openReceiptModal} onOpenChange={setOpenReceiptModal}>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                        {receiptData && <Receipt onClose={() => setOpenReceiptModal(false)} payment={receiptData} />}
                    </DialogContent>
                </Dialog>

            </CardContent>
        </Card>
    );
};

export default PaymentPage;
