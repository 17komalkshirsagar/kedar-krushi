



import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { toast } from "sonner";
import { useAddAllInstallmentMutation } from "../../redux/apis/paymentInstallment.api";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetAllPaymentsQuery } from "../../redux/apis/payment.api";
import InstallmentRecipt from "./InstallmentRecipt";

interface CustomerType {
    name: string;
}

interface PayAllPendingPaymentModalProps {
    customerId: string;
    customer: CustomerType;
    totals: {
        paidAmount: number;
        pendingAmount: number;
        totalAmount: number;
    };
    refetch: () => void
}

const schema = z.object({
    amount: z.string().min(1, "Amount is required"),
    paymentMode: z.enum(["Cash", "UPI", "Bank Transfer", "Credit", "Other"]),
});

type FormData = z.infer<typeof schema>;

const PayAllPendingPaymentModal = ({
    customerId,
    customer,
    totals, refetch,
}: PayAllPendingPaymentModalProps) => {
    const [open, setOpen] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptPayments, setReceiptPayments] = useState<any[]>([]);
    const { data: paymentData } = useGetAllPaymentsQuery({});
    const [receiptBillNumber, setReceiptBillNumber] = useState("");

    const [payAll, { isSuccess: isAddSuccess, isError, isLoading }] = useAddAllInstallmentMutation();
    const combinedProducts = paymentData?.result?.flatMap((p: any) => p.products) || [];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            amount: String(totals.pendingAmount),
            paymentMode: "Cash",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            const res = await payAll({
                customerId,
                totalPayAmount: +data.amount,
                paymentDate: new Date().toISOString(),
                paymentMode: data.paymentMode,
                paymentReference: "ALL-IN-ONE",
            }).unwrap();
            setReceiptPayments(res.payments || []);
            setReceiptBillNumber(res.billNumber);
            setOpen(false);
            setShowReceipt(true);
            await refetch();
            reset();
        } catch (err) {
            console.log("Something went wrong.");
        }
    };

    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Pending Prdouct amount added successfully');

        }
    }, [isAddSuccess,]);



    useEffect(() => {
        if (isError) {
            toast.error('Failed to save product');
        }
    }, [isError]);

    return (
        <>
            <div className="mt-4 flex justify-end">
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                        reset({
                            amount: String(totals.pendingAmount),
                            paymentMode: "Cash",
                        });
                        setOpen(true);
                    }}
                >
                    💸 Pay All Pending
                </Button>

            </div>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader className="text-lg font-semibold">
                        Pay All Pending Amount – {customer.name}
                    </DialogHeader>


                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="flex-1 bg-green-50 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-500">✅ Paid Amount</p>
                            <p className="text-lg font-semibold text-green-700">
                                ₹{totals.paidAmount}
                            </p>
                        </div>
                        <div className="flex-1 bg-yellow-50 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-500">❌ Pending Amount</p>
                            <p className="text-lg font-semibold text-yellow-700">
                                ₹{totals.pendingAmount}
                            </p>
                        </div>
                        <div className="flex-1 bg-blue-50 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-500">💰 Total Amount</p>
                            <p className="text-lg font-semibold text-blue-700">
                                ₹{totals.totalAmount}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Label className="mb-1 block text-sm text-gray-600">
                            Amount to Pay
                        </Label>
                        <Input
                            type="number"
                            placeholder="Enter amount to pay"
                            {...register("amount")}
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>


                    {/* <div className="mt-4">
                        <Label className="text-sm font-medium text-gray-700 mb-1">
                            Select Payment Mode
                        </Label>
                        <Controller
                            name="paymentMode"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-wrap gap-4"
                                >
                                    {["Cash", "UPI", "Bank Transfer", "Credit", "Other"].map(
                                        (mode) => (
                                            <div key={mode} className="flex items-center gap-2">
                                                <RadioGroupItem value={mode} id={mode} />
                                                <Label htmlFor={mode} className="text-sm">
                                                    {mode}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </RadioGroup>
                            )}
                        />
                        {errors.paymentMode && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.paymentMode.message}
                            </p>
                        )}
                    </div> */}

                    <div className="mt-4">
                        <Label className="text-sm font-medium text-gray-700 mb-1">
                            Select Payment Mode
                        </Label>

                        <Controller
                            name="paymentMode"
                            control={control}
                            rules={{ required: "Select payment mode" }}
                            render={({ field }) => (
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {["Cash", "UPI", "Bank Transfer", "Credit", "Other"].map((mode) => (
                                        <div key={mode} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                id={mode}
                                                value={mode}
                                                checked={field.value === mode}
                                                onChange={() => field.onChange(mode)}
                                                className="accent-blue-600"
                                            />
                                            <Label htmlFor={mode} className="text-sm">
                                                {mode}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />

                        {errors.paymentMode && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.paymentMode.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="mt-6 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Cancel
                        </Button>

                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Submit Payment"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {showReceipt && receiptPayments.length > 0 && (
                <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>Receipt</DialogHeader>




                        <InstallmentRecipt
                            payment={{
                                customer: customer,
                                createdAt: new Date().toISOString(),
                                paymentMode: "Cash",
                                paymentReference: "ALL-IN-ONE",
                                billNumber: receiptBillNumber,


                                products: receiptPayments.flatMap(p =>
                                    p.products.map((prod: any) => ({
                                        ...prod,
                                        billNumber: p.billNumber,
                                        createdAt: p.createdAt,
                                    }))
                                ),

                                totalAmount: receiptPayments.reduce((sum, p) => sum + p.totalAmount, 0),
                                pendingAmount: receiptPayments.reduce((sum, p) => sum + p.pendingAmount, 0),
                                paidAmount: receiptPayments.reduce((sum, p) => sum + p.paidAmount, 0),
                            }}
                            onClose={() => setShowReceipt(false)}
                        />



                        <DialogFooter>
                            <Button onClick={() => setShowReceipt(false)} className=" text-white">
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}




        </>
    );
};

export default PayAllPendingPaymentModal;








