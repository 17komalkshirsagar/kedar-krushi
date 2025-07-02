import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { Icons } from '../../components/ui/icons';
import { useRegisterMutation } from '../../redux/apis/auth.api';
import { useEffect } from 'react';


const registerSchema = z
    .object({
        firstName: z.string().min(2, 'First name is required'),
        lastName: z.string().min(2, 'Last name is required'),
        email: z.string().email('Invalid email'),
        phone: z.string().min(10, 'Phone is required'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerUser, { isSuccess, isError, isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                password: data.password,
                confirmPassword: data.confirmPassword,
            }).unwrap();
        } catch (err: any) {
            console.log("failed");
        }
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("Lease created successfully!");
            navigate('/login');
        }
    }, [isSuccess]);
    useEffect(() => {
        if (isError) {
            toast.error('Registration failed');
        }
    }, [isError]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full  max-w-2xl">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <Icons.sprout className="h-10 w-20 text-green-400" />                  </div>
                    <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Join our community of farmers and agricultural enthusiasts
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="flex gap-x-4">
                            <div className="space-y-2 w-full">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" {...register('firstName')} />
                                {errors.firstName && (
                                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2 w-full">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" className="w-full" {...register('lastName')} />
                                {errors.lastName && (
                                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-x-4">
                            <div className="space-y-2 w-full">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register('email')} />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2 w-full">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" {...register('phone')} />
                                {errors.phone && (
                                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-x-4">
                            <div className="space-y-2 w-full">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register('password')} />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="space-y-2 w-full">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-green-400" disabled={isLoading}>
                            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    <div className="text-sm text-center w-full">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-700 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;
