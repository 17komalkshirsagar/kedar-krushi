
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useCreateInstallmentMutation } from "../../redux/apis/paymentInstallment.api";
import { useGetCustomerPaymentHistoryQuery } from "../../redux/apis/payment.api";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";


interface AddInstallmentModalProps {
    open: boolean;
    onClose: () => void;
    payment: any;
    customerId: string;
    customer: any;
}

const AddInstallmentModal = ({
    open,
    onClose,
    payment,
    customerId,
    customer,
}: AddInstallmentModalProps) => {
    const [createInstallment, { isSuccess: isAddSuccess, isError, isLoading }] = useCreateInstallmentMutation();
    const { refetch } = useGetCustomerPaymentHistoryQuery(customerId);

    const {
        register,
        handleSubmit, control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            amount: payment?.pendingAmount || "",
            paymentMode: payment?.paymentMode || "Cash",
        },

    });

    const onSubmit = async (data: any) => {
        try {
            await createInstallment({
                billNumber: payment.billNumber,
                customerId,
                amount: Number(data.amount),
                paymentMode: data.paymentMode,
                paymentDate: new Date().toISOString(),
                paymentReference: "",
            }).unwrap();


            reset();
            await refetch();
            onClose();
        } catch (err) {


            console.log("Failed to create installment");
        }
    };
    useEffect(() => {
        if (isAddSuccess) {
            toast.success(`amount added successfully.`);

        }
    }, [isAddSuccess,]);

    useEffect(() => {
        if (payment) {
            reset({
                amount: payment.pendingAmount || "",
                paymentMode: payment.paymentMode || "Cash",
            });
        }
    }, [payment, reset]);


    useEffect(() => {
        if (isError) {
            toast.error("Failed to create installment");
        }
    }, [isError]);

    useEffect(() => {
        if (isLoading) {
            toast.info("Adding installment...");
        }
    }, [isLoading,]);
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
                    Add Installment
                </h2>

                {payment && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Summary */}
                        <div className="bg-gray-40 border border-gray-200 rounded-2xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Installment Summary: {customer.name}
                            </h3>
                            <hr />
                            <div className="space-y-4 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <p className="font-medium">
                                        Bill No:{" "}
                                        <span className="text-gray-800">
                                            {payment.billNumber}
                                        </span>
                                    </p>
                                    <p className="font-medium">
                                        Date:{" "}
                                        <span className="text-gray-800">
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-blue-100 p-3 rounded-md">
                                        <p className="text-xs text-blue-700 uppercase">Total</p>
                                        <p className="text-base font-bold text-blue-900">
                                            ₹{payment.totalAmount}
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-md">
                                        <p className="text-xs text-green-700 uppercase">Paid</p>
                                        <p className="text-base font-bold text-green-900">
                                            ₹{payment.paidAmount}
                                        </p>
                                    </div>
                                    <div className="bg-red-100 p-3 rounded-md">
                                        <p className="text-xs text-red-700 uppercase">Pending</p>
                                        <p className="text-base font-bold text-red-900">
                                            ₹{payment.pendingAmount}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 gap-6">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Payment Mode:
                                        </p>
                                        <span className="inline-block bg-blue-200 text-blue-900 text-sm px-3 py-1 rounded-full font-semibold">
                                            {payment.paymentMode}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Status:
                                        </p>
                                        <span
                                            className={`inline-block text-sm px-3 py-1 rounded-full font-semibold
                                            ${payment.paymentStatus === "Paid"
                                                    ? "bg-green-200 text-green-800"
                                                    : payment.paymentStatus ===
                                                        "Partial"
                                                        ? "bg-yellow-200 text-yellow-900"
                                                        : "bg-red-200 text-red-900"
                                                }`}
                                        >
                                            {payment.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <Label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Installment Amount
                            </Label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    ₹
                                </span>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    className="pl-8"
                                    {...register("amount", { required: "Amount is required" })}
                                />
                            </div>
                            {errors.amount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.amount.message as string}
                                </p>
                            )}
                        </div>




                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Payment Mode
                            </Label>

                            <Controller
                                name="paymentMode"
                                control={control}
                                defaultValue={payment?.paymentMode || "Cash"}
                                rules={{ required: "Select payment mode" }}
                                render={({ field }) => (
                                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                                        {["Cash", "UPI", "Bank Transfer", "Credit", "Other"].map((mode) => (
                                            <label key={mode} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    value={mode}
                                                    checked={field.value === mode}
                                                    onChange={() => field.onChange(mode)}
                                                    className="accent-blue-600"
                                                />
                                                {mode}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            />

                            {errors.paymentMode && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.paymentMode.message as string}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
                            <Button
                                type="button"
                                onClick={onClose}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Add Installment
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddInstallmentModal;
