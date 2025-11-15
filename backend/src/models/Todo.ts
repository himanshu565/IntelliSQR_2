import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
