import React, { useEffect } from 'react';
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
    useCreateAddEmployeeMutation,
    useGetEmployeeByIdQuery,
    useUpdateEmployeeMutation,
} from '../../redux/apis/employee.api';

const employeeSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().min(1, 'Mobile number is required'),
    address: z.string().min(1, 'Address is required'),
    role: z.enum(['Admin', 'Sales', 'Manager'], { required_error: 'Role is required' }),
    status: z.enum(['active', 'inactive'], { required_error: 'Status is required' }),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const defaultValues: EmployeeFormData = {
    name: '',
    email: '',
    phone: '',
    address: '',

    role: 'Sales',
    status: 'active',
};

const EmployeePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues,
    });

    const [addEmployee, { isSuccess: isAddSuccess, isError: isAddError }] = useCreateAddEmployeeMutation();
    const [updateEmployee, { isSuccess: isUpdateSuccess }] = useUpdateEmployeeMutation();

    const { data: employeeData, isLoading } = useGetEmployeeByIdQuery(id ?? '', {
        skip: !id || !navigator.onLine,
    });

    useEffect(() => {
        if (id && employeeData) {
            reset({
                name: employeeData.name || '',
                email: employeeData.email || '',
                phone: employeeData.phone || '',
                address: employeeData.address || '',
                role: ['Admin', 'Sales', 'Manager'].includes(employeeData.role)
                    ? (employeeData.role as 'Admin' | 'Sales' | 'Manager')
                    : 'Sales',
                status: ['active', 'inactive'].includes(employeeData.status ?? '')
                    ? (employeeData.status as 'active' | 'inactive')
                    : 'active',
            });
        }
    }, [id, employeeData, reset]);


    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Employee created successfully');
            navigate('/employee-table');
        }
    }, [isAddSuccess, navigate]);

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Employee updated successfully');
            navigate('/employee-table');
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        if (isAddError) {
            toast.error('Failed to create employee');
        }
    }, [isAddError]);

    const onSubmit = (data: EmployeeFormData) => {
        if (id) {
            updateEmployee({ id, data });
        } else {
            addEmployee(data);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <Icons.user className="h-10 w-20 mb-2 text-blue-500" />
                    <CardTitle>{id ? 'Update Employee' : 'Add Employee'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register('name')} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register('email')} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="phone">Mobile</Label>
                                <Input id="phone" {...register('phone')} />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" {...register('address')} />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>


                        <div className="flex gap-4">
                            {/* Role */}
                            <div className="w-1/2">
                                <Label htmlFor="role">Role</Label>
                                <select id="role" {...register('role')} className="w-full border rounded px-3 py-2">
                                    <option value="Admin">Admin</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Manager">Manager</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                            </div>

                            {/* Status */}
                            <div className="w-1/2">
                                <Label htmlFor="status">Status</Label>
                                <select id="status" {...register('status')} className="w-full border rounded px-3 py-2">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
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
    );
};

export default EmployeePage;
