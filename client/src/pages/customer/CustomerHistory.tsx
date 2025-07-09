




import React, { useState } from 'react';
import { useGetCustomerPaymentHistoryQuery } from '../../redux/apis/payment.api';
import { useGetAllCustomersQuery } from '../../redux/apis/customer.api';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';


import AddInstallmentModal from '../installment/AddInstallmentModal';
import InstallmentAccordion from '../installment/InstallmentAccordion';

import PayAllPendingPaymentModal from '../installment/PayAllPendingPaymentModal';

const CustomerHistory = ({ customerId }: { customerId: string }) => {

    if (!customerId) {
        return <p className="text-red-500 text-center mt-10">Invalid or missing customer ID.</p>;
    }
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [expandedBill, setExpandedBill] = useState<string | null>(null);

    const { data: paymentData, isLoading, refetch } = useGetCustomerPaymentHistoryQuery(customerId);
    const { data: allCustomers } = useGetAllCustomersQuery({});

    ``
    if (isLoading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

    const customer = allCustomers?.result?.find(c => c._id === customerId);

    const payments = paymentData?.result || [];
    const totals = paymentData?.totals || { totalAmount: 0, paidAmount: 0, pendingAmount: 0 };
    const purchaseInfo = paymentData?.purchaseInfo;
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {customer && (
                <Card className="shadow-xl rounded-2xl bg-white border border-gray-200">
                    <CardContent className="p-6 space-y-6">

                        <div className="flex items-center justify-between border-b pb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <span className="text-blue-500">👤</span> Customer Information
                            </h2>
                            <Badge
                                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${customer.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {customer.status?.toUpperCase()}
                            </Badge>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-sm">
                            <p><span className="font-medium">🧾 Name:</span> {customer.name}</p>
                            <p><span className="font-medium">🏠 Address:</span> {customer.address}</p>
                            <p><span className="font-medium">📞 Mobile:</span> {customer.mobile}</p>
                            <p><span className="font-medium">📧 Email:</span> {customer.email}</p>
                        </div>


                        <div className="mt-4">
                            <PayAllPendingPaymentModal
                                customerId={customer._id ?? ""} customer={customer} totals={totals} refetch={refetch} /></div>




                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm text-center">
                                <p className="text-sm text-gray-500">✅ Paid Amount</p>
                                <p className="text-lg font-semibold text-green-700">₹{totals.paidAmount}</p>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow-sm text-center">
                                <p className="text-sm text-gray-500">❌ Pending Amount</p>
                                <p className="text-lg font-semibold text-yellow-700">₹{totals.pendingAmount}</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm text-center">
                                <p className="text-sm text-gray-500">💰 Total Amount</p>
                                <p className="text-lg font-semibold text-blue-700">₹{totals.totalAmount}</p>
                            </div>
                        </div>

                        {purchaseInfo && (
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600 space-y-2">
                                <p><span className="font-medium">🗓 Year Range:</span> {purchaseInfo.yearRange}</p>
                                <p><span className="font-medium">📅 First Purchase:</span> {purchaseInfo.firstDate}</p>
                                <p><span className="font-medium">📅 Last Purchase:</span> {purchaseInfo.lastDate}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}










            <div className="overflow-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-100 text-gray-700 tracking-wide text-xs font-semibold">
                        <tr>
                            <th className="px-4 py-3 border">Bill No</th>
                            <th className="px-4 py-3 border">Date</th>
                            <th className="px-4 py-3 border">Products</th>
                            <th className="px-4 py-3 border">Total (₹)</th>
                            <th className="px-4 py-3 border">Paid (₹)</th>
                            <th className="px-4 py-3 border">Pending (₹)</th>
                            <th className="px-4 py-3 border">Quantity</th>
                            <th className="px-4 py-3 border">Mode</th>
                            <th className="px-4 py-3 border">Status</th>
                        </tr>
                    </thead>



                    <tbody className="bg-white divide-y">
                        {paymentData?.result?.map((payment: any) => (
                            <React.Fragment key={payment._id}>

                                <tr
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={(e) => {

                                        if ((e.target as HTMLElement).tagName.toLowerCase() === "button") return;
                                        setExpandedBill(
                                            expandedBill === payment.billNumber ? null : payment.billNumber
                                        );
                                    }}
                                >
                                    <td className="px-4 py-2 border">{payment.billNumber}</td>
                                    <td className="px-4 py-2 border">
                                        {new Date(payment.createdAt).toLocaleDateString("hi-IN")}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {payment.products.map((p: any) => p.product.name).join(", ")}
                                    </td>
                                    <td className="px-4 py-2 border">₹{payment.totalAmount}</td>
                                    <td className="px-4 py-2 border">₹{payment.paidAmount}</td>
                                    <td className="px-4 py-2 border">₹{payment.pendingAmount}</td>
                                    <td className="px-4 py-2 border">
                                        {payment.products.reduce((total: any, p: any) => total + p.quantity, 0)}
                                    </td>
                                    <td className="px-4 py-2 border">{payment.paymentMode}</td>
                                    <td className="px-4 py-2 border flex items-center gap-2">
                                        <Badge
                                            className={
                                                payment.paymentStatus === "Paid"
                                                    ? "bg-green-500 text-white"
                                                    : payment.paymentStatus === "Partial"
                                                        ? "bg-yellow-500 text-white"
                                                        : "bg-red-500 text-white"
                                            }
                                        >
                                            {payment.paymentStatus}
                                        </Badge>

                                        {payment.pendingAmount > 0 && (
                                            <Button
                                                size="sm"
                                                className="bg-blue-600 text-white hover:bg-blue-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedPayment(payment);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Pay
                                            </Button>
                                        )}
                                    </td>

                                </tr>

                                {expandedBill === payment.billNumber && payment.billNumber && (
                                    <tr>
                                        <td colSpan={9} className="bg-gray-50 border px-4 py-3">
                                            <InstallmentAccordion billNumber={payment.billNumber} />
                                        </td>

                                    </tr>

                                )}


                            </React.Fragment>
                        ))}
                    </tbody>

                </table>
            </div>

            <AddInstallmentModal
                open={showModal}
                onClose={() => setShowModal(false)}
                payment={selectedPayment}
                customerId={customerId}
                customer={customer}
            />

        </div>
    );
};

export default CustomerHistory;
