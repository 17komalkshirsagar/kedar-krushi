import mongoose, { Schema, Document } from 'mongoose';

export interface ICounter extends Document {
    id: string;
    seq: number;
}

const CounterSchema: Schema<ICounter> = new Schema({
    id: { type: String, required: true, unique: true },
    seq: { type: Number, default: 0 },
});

export const Counter = mongoose.model<ICounter>('Counter', CounterSchema);