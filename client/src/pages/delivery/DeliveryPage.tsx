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
import { Textarea } from '../../components/ui/textarea'
import { Icons } from '../../components/ui/icons'

import {
    useCreateAddDeliveryMutation,
    useGetDeliveryByIdQuery,
    useUpdateDeliveryMutation,
} from '../../redux/apis/delivery.api'

import { useGetAllPaymentsQuery } from '../../redux/apis/payment.api'

const deliverySchema = z.object({
    payment: z.string().min(1, 'Payment is required'),
    address: z.string().min(1, 'Address is required'),
    status: z.enum(['Pending', 'Delivered', 'Failed', 'Cancelled', 'Shipped'], {
        required_error: 'Status is required',
    }),
})

type DeliveryFormData = z.infer<typeof deliverySchema>

const defaultValues: DeliveryFormData = {
    payment: '',
    address: '',
    status: 'Pending',
}

const DeliveryPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DeliveryFormData>({
        resolver: zodResolver(deliverySchema),
        defaultValues,
    })

    const [addDelivery, { isSuccess: isAddSuccess, isError: isAddError }] = useCreateAddDeliveryMutation()
    const [updateDelivery, { isSuccess: isUpdateSuccess }] = useUpdateDeliveryMutation()

    const { data: deliveryData, isLoading } = useGetDeliveryByIdQuery(id ?? '', {
        skip: !id || !navigator.onLine,
    })

    const { data: paymentData } = useGetAllPaymentsQuery({})

    useEffect(() => {
        if (id && deliveryData) {
            reset({
                payment: deliveryData.payment || '',
                address: deliveryData.address || '',
                status: deliveryData.status || 'Pending',
            })
        }
    }, [id, deliveryData, reset])

    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Delivery created successfully')
            navigate('/delivery-table')
        }
    }, [isAddSuccess, navigate])

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Delivery updated successfully')
            navigate('/delivery-table')
        }
    }, [isUpdateSuccess, navigate])

    useEffect(() => {
        if (isAddError) {
            toast.error('Failed to create delivery')
        }
    }, [isAddError])

    const onSubmit = (data: DeliveryFormData) => {
        if (id) {
            updateDelivery({ id, data })
        } else {
            addDelivery(data)
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <Icons.box className="h-10 w-10 mb-2 text-blue-500" />
                    <CardTitle>{id ? 'Update Delivery' : 'Add Delivery'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Payment Select */}
                        <div>
                            <Label htmlFor="payment">Select Payment</Label>
                            <select
                                id="payment"
                                {...register('payment')}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Payment</option>
                                {paymentData && paymentData?.result.map((p) => (
                                    <option key={p._id} value={p._id}>
                                        {p._id} - ₹{p.totalAmount}
                                    </option>
                                ))}
                            </select>
                            {errors.payment && <p className="text-red-500 text-sm">{errors.payment.message}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" {...register('address')} />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        {/* Status Radio Buttons */}
                        <div>
                            <Label>Status</Label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2">
                                    <input type="radio" value="Pending" {...register('status')} />
                                    Pending
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" value="Delivered" {...register('status')} />
                                    Delivered
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" value="Failed" {...register('status')} />
                                    Failed
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" value="Failed" {...register('status')} />
                                    Cancelled
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" value="Failed" {...register('status')} />
                                    Shipped
                                </label>
                            </div>
                            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" className="bg-red-600 text-white" onClick={() => reset()}>
                                Cancel
                            </Button>
                            <Button className="bg-green-600 text-white" type="submit" disabled={isLoading}>
                                {id ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default DeliveryPage
