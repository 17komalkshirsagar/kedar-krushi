

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Icons } from '../../components/ui/icons';

import {
    useCreateNotificationLogMutation,
    useGetNotificationLogByIdQuery,
    useUpdateNotificationLogMutation,
} from '../../redux/apis/notificationLog.api';
import { useGetAllCustomersQuery } from '../../redux/apis/customer.api';
import { useGetCustomerPaymentHistoryQuery } from '../../redux/apis/payment.api';

const schema = z.object({
    customer: z.string().min(1, 'Customer is required'),
    type: z.enum(['email', 'whatsapp'], { required_error: 'Type is required' }),
    message: z.string().optional(),
    status: z.enum(['Sent', 'Failed'], { required_error: 'Status is required' }),
});

type NotificationFormData = z.infer<typeof schema>;

const NotificationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { customerId: locationCustomerId } = location.state || {};

    const {
        register, handleSubmit, reset, getValues, formState: { errors }, } = useForm<NotificationFormData>({
            resolver: zodResolver(schema),
            defaultValues: { customer: '', type: 'email', message: '', status: 'Sent', },
        });

    const [selectedCustomerId, setSelectedCustomerId] = useState(locationCustomerId || '');
    const [selectedCustomerMobile, setSelectedCustomerMobile] = useState('');

    const [createNotification] = useCreateNotificationLogMutation();
    const [updateNotification] = useUpdateNotificationLogMutation();

    const { data: notificationData } = useGetNotificationLogByIdQuery(id!, { skip: !id });
    const { data: customers } = useGetAllCustomersQuery({});
    const { data: history } = useGetCustomerPaymentHistoryQuery(selectedCustomerId, {
        skip: !selectedCustomerId,
    });

    useEffect(() => {
        if (id && notificationData) {
            reset({
                customer: notificationData.customer,
                type: notificationData.type as 'email' | 'whatsapp',
                message: notificationData.message || '',
                status: notificationData.status as 'Sent' | 'Failed',
            });
        }
    }, [id, notificationData, reset]);

    // useEffect(() => {
    //     if (selectedCustomerId && customers?.result && history) {
    //         const selectedCustomer = customers.result.find((cust: any) => cust._id === selectedCustomerId);
    //         const customerName = selectedCustomer?.name || '';
    //         const mobile = selectedCustomer?.mobile || '';
    //         setSelectedCustomerMobile(mobile);

    //         const totals = history.totals || { totalAmount: 0, paidAmount: 0, pendingAmount: 0 };
    //         const purchaseInfo = history.purchaseInfo || {};
    //         const purchaseCount = history.result?.length || 0;

    //         const productSet = new Set<string>();
    //         history.result?.forEach((p: any) => {
    //             p.products.forEach((prod: any) => productSet.add(prod.product.name));
    //         });

    //         const productNames = Array.from(productSet).join(', ');

    //         const message = `प्रिय ${customerName},\n\nकेदार कृषी सेवा तर्फे नम्र विनंती आहे की आपण आपले शिल्लक रक्कम लवकरात लवकर भरावी. आपण केदार कृषी सेवा कडून ${purchaseInfo.firstDate || '---'} ते ${purchaseInfo.lastDate || '---'} दरम्यान खरेदी केली आहे. आपली एकूण खरेदी रक्कम ₹${totals.totalAmount} असून यापैकी ₹${totals.paidAmount} भरले असून ₹${totals.pendingAmount} शिल्लक आहे.\n\nआपण एकूण ${purchaseCount} बिल झालेले आहेत. खरेदी उत्पादने: ${productNames}.\n\nकृपया आपली थकबाकी रक्कम लवकरात लवकर भरा.\n\nधन्यवाद!\nकेदार कृषी सेवा`;

    //         reset({
    //             ...getValues(),
    //             customer: selectedCustomerId,
    //             message,
    //         });
    //     }
    // }, [selectedCustomerId, customers, history, reset]);


    useEffect(() => {
        if (selectedCustomerId && customers?.result && history) {
            const selectedCustomer = customers.result.find((cust: any) => cust._id === selectedCustomerId);
            const customerName = selectedCustomer?.name || '';
            const mobile = selectedCustomer?.mobile || '';
            setSelectedCustomerMobile(mobile);

            const totals = history.totals || { totalAmount: 0, paidAmount: 0, pendingAmount: 0 };
            const purchaseInfo = history.purchaseInfo || {};
            const purchaseCount = history.result?.length || 0;

            const productDetails: string[] = [];

            history.result?.forEach((purchase: any) => {
                const rawDate = purchase.date || purchase.createdAt;
                const purchaseDate = rawDate
                    ? new Intl.DateTimeFormat('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    }).format(new Date(rawDate))
                    : '---';

                purchase.products.forEach((prod: any) => {
                    productDetails.push(`${prod.product.name} (${purchaseDate})`);
                });
            });

            const productNames = productDetails.join(', ');

            const message = `प्रिय ${customerName},\n\nकेदार कृषी सेवा तर्फे नम्र विनंती आहे की आपण आपले शिल्लक रक्कम लवकरात लवकर भरावी. आपण केदार कृषी सेवा कडून ${purchaseInfo.firstDate || '---'} ते ${purchaseInfo.lastDate || '---'} दरम्यान खरेदी केली आहे. आपली एकूण खरेदी रक्कम ₹${totals.totalAmount} असून यापैकी ₹${totals.paidAmount} भरले असून ₹${totals.pendingAmount} शिल्लक आहे.\n\nआपण एकूण ${purchaseCount} बिल झालेले आहेत. खरेदी उत्पादने: ${productNames}.\n\nकृपया आपली थकबाकी रक्कम लवकरात लवकर भरा.\n\nधन्यवाद!\nकेदार कृषी सेवा`;

            reset({
                ...getValues(),
                customer: selectedCustomerId,
                message,
            });
        }
    }, [selectedCustomerId, customers, history, reset]);


    useEffect(() => {
        if (!id && !locationCustomerId) {
            reset({
                customer: '',
                type: 'email',
                message: '',
                status: 'Sent',
            });
            setSelectedCustomerId('');
            setSelectedCustomerMobile('');
        }
    }, [id, locationCustomerId, reset]);

    const onSubmit = async (data: NotificationFormData) => {
        try {
            if (id) {
                await updateNotification({ id, data });
                toast.success('Notification updated');
            } else {
                await createNotification(data);
                toast.success('Notification sent');
            }

            reset({ customer: '', type: 'email', message: '', status: 'Sent', });
            setSelectedCustomerId('');
            setSelectedCustomerMobile('');
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <Icons.mail className="h-10 w-10 text-blue-600 mb-2" />
                    <CardTitle>{id ? 'Update Notification' : 'Send Notification'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <Label htmlFor="customer">Customer</Label>
                                <select
                                    id="customer"
                                    {...register('customer')}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setSelectedCustomerId(selectedId);
                                        const selectedCustomer = customers?.result.find((cust: any) => cust._id === selectedId);
                                        setSelectedCustomerMobile(selectedCustomer?.mobile || '');
                                    }}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Select customer</option>
                                    {customers?.result?.map((cust: any) => (
                                        <option key={cust._id} value={cust._id}>
                                            {cust.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.customer && <p className="text-red-500 text-sm">{errors.customer.message}</p>}
                            </div>

                            <div className="flex-1 min-w-[200px]">
                                <Label htmlFor="type">Type</Label>
                                <select id="type" {...register('type')} className="w-full border rounded px-3 py-2">
                                    <option value="email">Email</option>
                                    <option value="whatsapp">WhatsApp</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={4} {...register('message')} />
                        </div>

                        <div className="flex flex-wrap justify-between items-end gap-3 mt-4">
                            <div className="flex-1 min-w-[200px]">
                                <Label htmlFor="status">Status</Label>
                                <select id="status" {...register('status')} className="w-full border rounded px-3 py-2">
                                    <option value="Sent">Sent</option>
                                    <option value="Failed">Failed</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    className="bg-red-700"
                                    variant="outline"
                                    onClick={() => {
                                        reset({
                                            customer: '',
                                            type: 'email',
                                            message: '',
                                            status: 'Sent',
                                        });
                                        setSelectedCustomerId('');
                                        setSelectedCustomerMobile('');
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="button"
                                    className="bg-green-600 flex items-center gap-2"
                                    onClick={() => {
                                        const message = getValues('message') || 'Hello! Please pay your remaining amount.';
                                        if (selectedCustomerMobile) {
                                            const whatsappLink = `https://wa.me/91${selectedCustomerMobile}?text=${encodeURIComponent(message)}`;
                                            window.open(whatsappLink, '_blank');
                                            reset({
                                                customer: '',
                                                type: 'email',
                                                message: '',
                                                status: 'Sent',
                                            });
                                            setSelectedCustomerId('');
                                            setSelectedCustomerMobile('');
                                        } else {
                                            toast.error('Please select a customer with a mobile number.');
                                        }
                                    }}
                                >
                                    <FaWhatsapp className="text-white" />
                                </Button>

                                <Button className="bg-green-700" type="submit">
                                    {id ? 'Update' : 'Send'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotificationPage;
