import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { ErrorLog } from "../models/ErrorLog";
import { AuthRequest } from "../middlewares/authmiddleware";

// CREATE TODO
export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      userId: req.user.id,
      title,
      description,
    });

    res.json({ success: true, todo });
  } catch (err: any) {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      route: "/todo/create",
    });
    res.status(500).json({ message: "Failed to create todo" });
  }
};

// GET ALL TODOS
export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, todos });
  } catch (err: any) {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      route: "/todo/list",
    });
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// UPDATE TODO
export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ success: true, todo });
  } catch (err: any) {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      route: "/todo/update",
    });
    res.status(500).json({ message: "Failed to update todo" });
  }
};

// DELETE TODO
export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ success: true, message: "Todo deleted" });
  } catch (err: any) {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      route: "/todo/delete",
    });
    res.status(500).json({ message: "Failed to delete todo" });
  }
};

// MARK COMPLETE / NOT COMPLETE
export const toggleTodo = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findOne({ _id: id, userId: req.user.id });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    res.json({ success: true, todo });
  } catch (err: any) {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      route: "/todo/toggle",
    });
    res.status(500).json({ message: "Failed to toggle todo" });
  }
};
