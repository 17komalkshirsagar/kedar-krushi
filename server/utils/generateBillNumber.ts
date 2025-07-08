import { Counter } from "../models/Counter";



export const generateBillNumber = async (): Promise<string> => {
    const currentYear = new Date().getFullYear().toString();
    const counter = await Counter.findOneAndUpdate(
        { id: currentYear },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const paddedSeq = counter.seq.toString().padStart(4, '0');
    return `${currentYear}-${paddedSeq}`;
};
