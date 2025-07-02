import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Icons } from '../../components/ui/icons';

import {
    useCreateAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from '../../redux/apis/product.api';
import { useGetAllSuppliersQuery } from '../../redux/apis/supplier.api';
import { useGetAllCompaniesQuery } from '../../redux/apis/company.api';


const productSchema = z.object({
    name: z.string().min(1),
    category: z.enum(['Pesticide', 'Seed', 'Fertilizer', 'Other']),
    company: z.string().min(1),
    description: z.string().optional(),
    price: z.string().refine((val) => !isNaN(Number(val)), {
        message: 'Price must be a valid number',
    }),
    stock: z.string().refine((val) => !isNaN(Number(val)), {
        message: 'Stock must be a valid number',
    }),
    unit: z.enum(['kg', 'liter', 'packet', 'unit']).optional(),
    expiryDate: z.coerce.date(),
    supplier: z.string().optional(),
    status: z.enum(['active', 'inactive', 'blocked']).optional(),
    batchNumber: z.string().min(1, { message: 'Batch number is required' })
});

type ProductFormData = z.infer<typeof productSchema>;

const defaultValues: ProductFormData = {
    name: '',
    category: 'Pesticide',
    company: '',
    description: '',
    price: '',
    stock: '',
    unit: 'kg',
    expiryDate: new Date(),
    supplier: '',
    status: 'active', batchNumber: '',
};

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues,
    });

    const [addProduct, { isSuccess: isAddSuccess, isError: isAddError }] = useCreateAddProductMutation();
    const [updateProduct, { isSuccess: isUpdateSuccess }] = useUpdateProductMutation();
    const { data } = useGetAllSuppliersQuery({});
    const { data: companyData } = useGetAllCompaniesQuery({});
    const { data: productData, isLoading } = useGetProductByIdQuery(id ?? '', {
        skip: !id,
    });
    const [currentStock, setCurrentStock] = useState<number>(0);

    useEffect(() => {
        if (id && productData && companyData && data) {
            reset({
                name: productData.name,
                category: productData.category,
                company: (productData.company as any)?._id ?? '',
                description: productData.description ?? '',
                price: productData.price?.toString() ?? '',
                stock: productData.stock?.toString() ?? '',
                unit: productData.unit ?? 'kg',
                expiryDate: ((productData.expiryDate as any)?.split?.('T')[0]) ?? '',
                supplier: (productData.supplier as any)?._id ?? '',
                status: productData.status ?? 'active',
                batchNumber: productData.batchNumber ?? '',

            });
            setCurrentStock(Number(productData.stock ?? 0));
        }
    }, [id, productData, companyData, data, reset]);

    console.log('ProductData:', productData);
    console.log('CompanyData:', companyData?.result);
    console.log('SupplierData:', data?.result);

    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Product added successfully');
            navigate('/product-table');
        }
    }, [isAddSuccess, navigate]);

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Product updated successfully');
            navigate('/product-table');
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        if (isAddError) {
            toast.error('Failed to save product');
        }
    }, [isAddError]);

    const onSubmit = (data: ProductFormData) => {
        const payload = {
            ...data,
            price: data.price.toString(),
            stock: data.stock.toString(),
        };

        if (id) {
            updateProduct({ id, data: payload as any });
        } else {
            addProduct(payload as any);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <Icons.package className="h-10 w-10 mb-2 text-green-600" />
                    <CardTitle>{id ? 'Update Product' : 'Add Product'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    {...register('name')}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div className="w-1/2">
                                <Label htmlFor="batchNumber">Batch Number</Label>
                                <Input id="batchNumber" {...register('batchNumber')} />
                                {errors.batchNumber && <p className="text-red-500 text-sm">{errors.batchNumber.message}</p>}
                            </div>
                        </div>


                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="category">Category</Label>
                                <select id="category" {...register('category')} className="w-full border rounded px-3 py-2">
                                    <option value="Pesticide">Pesticide</option>
                                    <option value="Seed">Seed</option>
                                    <option value="Fertilizer">Fertilizer</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                            </div>

                            <div className="w-1/2">
                                <Label htmlFor="company">Company</Label>
                                <select id="company" {...register('company')} className="w-full border rounded px-3 py-2">
                                    <option value="">Select Company</option>
                                    {companyData?.result?.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    {...register('price')}
                                    onChange={(e) => setValue('price', e.target.value)}
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    {...register('stock')}
                                    onChange={(e) => {
                                        setValue('stock', e.target.value);
                                        setCurrentStock(Number(e.target.value));
                                    }}
                                />


                                {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="unit">Unit</Label>
                                <select id="unit" {...register('unit')} className="w-full border rounded px-3 py-2">
                                    <option value="kg">kg</option>
                                    <option value="liter">liter</option>
                                    <option value="packet">packet</option>
                                    <option value="unit">unit</option>
                                </select>
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" type="date" {...register('expiryDate')} />
                                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="supplier">Supplier</Label>
                                <select id="supplier" {...register('supplier')} className="w-full border rounded px-3 py-2">
                                    <option value="">Select Supplier</option>
                                    {data?.result?.map((supplier) => (
                                        <option key={supplier._id} value={supplier._id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-1/2">
                                <Label htmlFor="status">Status</Label>
                                <select id="status" {...register('status')} className="w-full border rounded px-3 py-2">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="blocked">Blocked</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register('description')} />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button className="bg-red-600" type="button" variant="outline" onClick={() => reset()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-green-600">
                                {id ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductPage;
