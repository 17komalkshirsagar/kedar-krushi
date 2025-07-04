import { Types } from 'mongoose';
import { Payment } from '../models/payment';
import { PaymentInstallment } from '../models/PaymentInstallment';

export const recalculatePaymentStatus = async (paymentId: string | Types.ObjectId) => {
    const payment = await Payment.findById(paymentId);
    if (!payment) return;

    const installments = await PaymentInstallment.find({ payment: payment._id });
    const totalPaid = installments.reduce((sum, i) => sum + i.amount, 0);

    payment.paidAmount = totalPaid;
    payment.pendingAmount = payment.totalAmount - totalPaid;

    payment.paymentStatus =
        totalPaid === 0
            ? 'Unpaid'
            : totalPaid >= payment.totalAmount
                ? 'Paid'
                : 'Partial';

    await payment.save();
};
