// PaymentInstallment.tsx
import React from 'react';
import { useGetAllInstallmentsQuery, useDeleteInstallmentMutation, useToggleInstallmentBlockMutation } from '@/api/paymentInstallmentApi';
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Loader2, Trash2, Ban, Eye } from 'lucide-react';

const PaymentInstallment = () => {
    const { data, isLoading } = useGetAllInstallmentsQuery({});
    const [deleteInstallment] = useDeleteInstallmentMutation();
    const [toggleBlock] = useToggleInstallmentBlockMutation();

    if (isLoading) return <div className="p-6 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Installment Payments</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Bill Number</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.result?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.billNumber}</TableCell>
                            <TableCell>{item.customer?.name || "N/A"}</TableCell>
                            <TableCell>₹{item.amount}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.paymentMode}</TableCell>
                            <TableCell>{new Date(item.paymentDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm" onClick={() => toggleBlock(item._id)}>
                                    <Ban className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => deleteInstallment(item._id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PaymentInstallment;
