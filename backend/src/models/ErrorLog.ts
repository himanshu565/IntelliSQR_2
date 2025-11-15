import mongoose, { Schema, Document } from "mongoose";

export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  route: string;
}

const errorSchema = new Schema<IErrorLog>(
  {
    message: String,
    stack: String,
    route: String
  },
  { timestamps: true }
);

export const ErrorLog = mongoose.model<IErrorLog>("ErrorLog", errorSchema);
