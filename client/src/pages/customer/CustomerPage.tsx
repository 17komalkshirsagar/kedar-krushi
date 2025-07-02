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
    useCreateAddCustomerMutation,
    useGetCustomerByIdQuery,
    useUpdateCustomerMutation
} from '../../redux/apis/customer.api'

const customerSchema = z.object({
    name: z.string().min(1, 'Customer name is required'),
    address: z.string().min(1, 'Address is required'),
    email: z.string().email('Enter a valid email').optional(),
    mobile: z.string().min(1, 'Mobile is required'),
})

type CustomerFormData = z.infer<typeof customerSchema>

const defaultValues: CustomerFormData = {
    name: '',
    address: '',
    email: '',
    mobile: ''
}

const CustomerPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
        defaultValues
    })

    const [addCustomer, { isSuccess: isAddSuccess, isError: isAddError }] = useCreateAddCustomerMutation()
    const [updateCustomer, { isSuccess: isUpdateSuccess }] = useUpdateCustomerMutation()

    const { data: customerData, isLoading } = useGetCustomerByIdQuery(id ?? '', {
        skip: !id || !navigator.onLine
    })

    useEffect(() => {
        if (id && customerData) {
            reset({
                name: customerData.name || '',
                address: customerData.address || '',
                email: customerData.email || '',
                mobile: customerData.mobile || ''
            })
        }
    }, [id, customerData, reset])

    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Customer created successfully')
            navigate('/customer-table')
        }
    }, [isAddSuccess, navigate])

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Customer updated successfully')
            navigate('/customer-table')
        }
    }, [isUpdateSuccess])

    useEffect(() => {
        if (isAddError) {
            toast.error('Failed to create customer')
        }
    }, [isAddError])

    const onSubmit = (data: CustomerFormData) => {
        if (id) {
            updateCustomer({ id, data })
        } else {
            addCustomer(data)
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <Icons.user className="h-10 w-20 mb-2 text-blue-500" />
                    <CardTitle>{id ? 'Update Customer' : 'Add Customer'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Customer Name</Label>
                            <Input id="name" {...register('name')} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" {...register('address')} />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        {/* Email and Mobile */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register('email')} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            <div className="w-1/2">
                                <Label htmlFor="mobile">Mobile</Label>
                                <Input id="mobile" {...register('mobile')} />
                                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button className="bg-red-600" type="button" variant="outline" onClick={() => reset()}>
                                Cancel
                            </Button>
                            <Button className="bg-green-700" type="submit" disabled={isLoading}>
                                {id ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CustomerPage
