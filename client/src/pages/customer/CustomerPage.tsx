import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { useAddAllInstallmentMutation } from "../../redux/apis/paymentInstallment.api";
import { useForm } from "react-hook-form";
import { Label } from "../../components/ui/label";

interface PayAllPendingPaymentModalProps {
    customerId: string;
    totals: {
        paidAmount: number;
        pendingAmount: number;
        totalAmount: number;
    };
}

const PayAllPendingPaymentModal = ({
    customerId,
    totals,
}: PayAllPendingPaymentModalProps) => {
    const [open, setOpen] = useState(false);
    const [payAll, { isLoading }] = useAddAllInstallmentMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ amount: number }>();

    const onSubmit = async (data: { amount: number }) => {
        try {
            await payAll({
                customerId,
                totalPayAmount: +data.amount,
                paymentDate: new Date().toISOString(),
                paymentMode: "Cash",
                paymentReference: "ALL-IN-ONE",
            }).unwrap();

            toast.success("Payment successfully submitted.");
            setOpen(false);
            reset();
        } catch (err) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <>
            <div className="mt-4">
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setOpen(true)}
                >
                    💸 Pay All Pending
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader className="text-lg font-semibold">
                        Pay All Pending Amount
                    </DialogHeader>

                    {/* Totals display - side by side */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm text-center">
                            <p className="text-sm text-gray-500">✅ Paid Amount</p>
                            <p className="text-lg font-semibold text-green-700">
                                ₹{totals.paidAmount}
                            </p>
                        </div>
                        <div className="flex-1 bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow-sm text-center">
                            <p className="text-sm text-gray-500">❌ Pending Amount</p>
                            <p className="text-lg font-semibold text-yellow-700">
                                ₹{totals.pendingAmount}
                            </p>
                        </div>
                        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm text-center">
                            <p className="text-sm text-gray-500">💰 Total Amount</p>
                            <p className="text-lg font-semibold text-blue-700">
                                ₹{totals.totalAmount}
                            </p>
                        </div>
                    </div>

                    {/* Input field */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <Label className="mb-1 block text-sm text-gray-600">
                            Enter Amount to Pay
                        </Label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            {...register("amount", { required: "Amount is required" })}
                            className="w-full"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.amount.message}
                            </p>
                        )}

                        <DialogFooter className="mt-6 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Submit Payment"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PayAllPendingPaymentModal;
