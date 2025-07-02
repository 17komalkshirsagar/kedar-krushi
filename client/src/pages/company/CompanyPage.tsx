import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom'
import { Icons } from '../../components/ui/icons';

import {
    useAddcreateCompanyMutation,
    useGetCompanyByIdQuery,
    useUpdateCompanyMutation
} from '../../redux/apis/company.api'

import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Textarea } from '../../components/ui/textarea'
import * as ToastPrimitives from "@radix-ui/react-toast"
import { Toast } from '../../components/ui/toast'


const companySchema = z.object({
    name: z.string().min(1, "Company name is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email or Enter valid email").optional(),
    mobile: z.string().min(1, "Mobile is required"),
})

type CompanyFormData = z.infer<typeof companySchema>

const defaultValues: CompanyFormData = {
    name: '',
    address: '',
    email: '',
    mobile: ''
}

const CompanyPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
        defaultValues
    })

    const [addCompany, { isSuccess: isAddSuccess, isError: isAddError }] = useAddcreateCompanyMutation()
    const [updateCompany, { isSuccess: isUpdateSuccess }] = useUpdateCompanyMutation()

    const { data: companyData, isLoading } = useGetCompanyByIdQuery(id ?? '', {
        skip: !id || !navigator.onLine
    })

    useEffect(() => {
        if (id && companyData) {
            reset({
                name: companyData.name || '',
                address: companyData.address || '',
                email: companyData.email || '',
                mobile: companyData.mobile || ''
            })
        }
    }, [id, companyData, reset])

    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Company created successfully');
            navigate('/company-table');
        }
    }, [isAddSuccess, navigate]);
    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Company updated successfully')

        }
    }, [isUpdateSuccess])
    useEffect(() => {
        if (isAddError) {
            toast.error('Failed to create company')
        }
    }, [isAddError])





    const onSubmit = (data: CompanyFormData) => {

        if (id) {
            updateCompany({ id, companyData: data as any })
        } else {
            addCompany(data as any)
        }
    }
    // const onSubmit = (data: CompanyFormData) => {
    //     const formData = new FormData();

    //     Object.entries(data).forEach(([key, value]) => {
    //         if (value) {
    //             formData.append(key, value);
    //         }
    //     });

    //     if (id) {
    //         updateCompany({ id, companyData: formData });
    //     } else {
    //         addCompany(formData);
    //     }
    // };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card>
                <CardHeader className="flex items-center justify-center ">
                    <Icons.wheat className="h-10 w-20 mb-2 text-green-400" />

                    <CardTitle>{id ? 'Update Company' : 'Add Company'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Company Name</Label>
                            <Input id="name" {...register('name')} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" {...register('address')} />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        {/* Email & Phone side by side */}
                        <div className="flex gap-4">
                            {/* Email */}
                            <div className="w-1/2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register('email')} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Mobile */}
                            <div className="w-1/2">
                                <Label htmlFor="mobile">Mobile</Label>
                                <Input id="mobile" {...register('mobile')} />
                                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                            </div>
                        </div>


                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button className='bg-red-600' type="button" variant="outline" onClick={() => reset()}>
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

export default CompanyPage
