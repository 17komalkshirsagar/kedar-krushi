import mongoose, { Model, Schema } from "mongoose";
export interface ICompany {
  name: string;
  address?: string;
  email?: string;
  mobile?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  isDeleted?: Boolean,
  isBlock?: boolean;
}


const CompanySchema = new Schema<ICompany>(
  {

    name: { type: String, required: true, unique: true },
    address: { type: String },
    email: { type: String },
    mobile: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Company: Model<ICompany> = mongoose.model<ICompany>("Company", CompanySchema);