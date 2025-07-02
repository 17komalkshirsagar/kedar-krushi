import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Icons } from '../../components/ui/icons'

import {
    useAddCreateBatchMutation,
    useGetBatchByIdQuery,
    useUpdateBatchMutation,
} from '../../redux/apis/batch.api'
import { useGetAllSuppliersQuery } from '../../redux/apis/supplier.api'
import { useGetAllProductsQuery } from '../../redux/apis/product.api'

const batchSchema = z.object({
    supplier: z.string().min(1, { message: 'Supplier is required' }),
    product: z.string().min(1, { message: 'Product is required' }),
    batchNumber: z.string().min(1),
    manufactureDate: z.coerce.date(),
    expiryDate: z.coerce.date(),

    stock: z.coerce.number().min(0),
    purchasePrice: z.coerce.number().min(0),
    costPrice: z.coerce.number().min(0),
    mrp: z.coerce.number().min(0),
    sellingPrice: z.coerce.number().min(0),

})

type BatchFormData = z.infer<typeof batchSchema>

const defaultValues: BatchFormData = {
    supplier: '',
    product: '',
    batchNumber: '',
    stock: 0,
    purchasePrice: 0,
    costPrice: 0,
    mrp: 0,
    sellingPrice: 0,
    manufactureDate: new Date(),
    expiryDate: new Date(),
}

const BatchPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: supplierData } = useGetAllSuppliersQuery({})
    const { data: productData } = useGetAllProductsQuery({})
    const { data: batchData } = useGetBatchByIdQuery(id ?? '', { skip: !id })
    const [updateBatch, { isSuccess: isUpdateSuccess }] = useUpdateBatchMutation();

    const [addBatch, { isSuccess: isAddSuccess, isError: isAddError }] = useAddCreateBatchMutation()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<BatchFormData>({
        resolver: zodResolver(batchSchema),
        defaultValues
    })

    useEffect(() => {
        if (id && batchData) {
            reset({
                supplier: batchData.supplier || '',
                product: (batchData.product as any)?._id ?? '',
                batchNumber: batchData.batchNumber || '',
                stock: batchData.stock ?? 0,
                purchasePrice: batchData.purchasePrice ?? 0,
                costPrice: batchData.costPrice ?? 0,
                mrp: batchData.mrp ?? 0,
                sellingPrice: batchData.sellingPrice ?? 0,
                manufactureDate: ((batchData.manufactureDate as any)?.split?.('T')[0]) ?? '',
                expiryDate: ((batchData.expiryDate as any)?.split?.('T')[0]) ?? '',
            });
        }
    }, [id, batchData, reset]);


    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Batch created successfully')
            navigate('/batch-table')
        }
    }, [isAddSuccess])

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Batch updated successfully');
            navigate('/batch-table');
        }
    }, [isUpdateSuccess, navigate]);
    useEffect(() => {
        if (isAddError) {
            toast.error('Failed to create batch')
        }
    }, [isAddError])
    const onSubmit = (data: BatchFormData) => {
        const payload = {
            ...data,
            stock: data.stock.toString(),
            purchasePrice: data.purchasePrice.toString(),
            costPrice: data.costPrice.toString(),
            mrp: data.mrp.toString(),
            sellingPrice: data.sellingPrice.toString(),
            price: data.sellingPrice.toString(),
            manufactureDate: new Date(data.manufactureDate).toISOString().split('T')[0],
            expiryDate: new Date(data.expiryDate).toISOString().split('T')[0],
        };
        if (id) {

            updateBatch({ id, batchData: payload });
        } else {

            addBatch(payload as any);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <Icons.box className="h-10 w-10 mb-2 text-blue-600" />
                    <CardTitle>{id ? 'Update Batch' : 'Add Batch'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Supplier and Product */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="supplier">Supplier</Label>
                                <select id="supplier" {...register('supplier')} className="w-full border rounded px-3 py-2">
                                    <option value="">Select Supplier</option>
                                    {supplierData?.result?.map((supplier) => (
                                        <option key={supplier._id} value={supplier._id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier.message}</p>}
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="product">Product</Label>
                                <select id="product" {...register('product')} className="w-full border rounded px-3 py-2">
                                    <option value="">Select Product</option>
                                    {productData?.result?.map((product) => (
                                        <option key={product._id} value={product._id}>
                                            {product.name} (₹{product.price})
                                        </option>
                                    ))}
                                </select>
                                {errors.product && <p className="text-red-500 text-sm">{errors.product.message}</p>}
                            </div>
                        </div>

                        {/* Other Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Batch Number</Label>
                                <Input {...register('batchNumber')} />
                                {errors.batchNumber && <p className="text-red-500 text-sm">{errors.batchNumber.message}</p>}
                            </div>

                            <div>
                                <Label>Stock</Label>
                                <Input type="number" {...register('stock')} />
                                {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                            </div>

                            <div>
                                <Label>Purchase Price</Label>
                                <Input type="number" {...register('purchasePrice')} />
                                {errors.purchasePrice && <p className="text-red-500 text-sm">{errors.purchasePrice.message}</p>}
                            </div>

                            <div>
                                <Label>Cost Price</Label>
                                <Input type="number" {...register('costPrice')} />
                                {errors.costPrice && <p className="text-red-500 text-sm">{errors.costPrice.message}</p>}
                            </div>

                            <div>
                                <Label>MRP</Label>
                                <Input type="number" {...register('mrp')} />
                                {errors.mrp && <p className="text-red-500 text-sm">{errors.mrp.message}</p>}
                            </div>

                            <div>
                                <Label>Selling Price</Label>
                                <Input type="number" {...register('sellingPrice')} />
                                {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice.message}</p>}
                            </div>

                            <div>
                                <Label>Manufacture Date</Label>
                                <Input type="date" {...register('manufactureDate')} />
                                {errors.manufactureDate && <p className="text-red-500 text-sm">{errors.manufactureDate.message}</p>}
                            </div>

                            <div>
                                <Label>Expiry Date</Label>
                                <Input type="date" {...register('expiryDate')} />
                                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" className="bg-red-600 text-white" onClick={() => reset()}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-green-600 text-white">
                                {id ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default BatchPage
