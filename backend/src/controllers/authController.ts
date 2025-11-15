import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { ErrorLog } from "../models/ErrorLog";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    return res.json({ success: true, user });
  } catch (err: any) {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      route: "/auth/signup"
    });

    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    return res.json({ success: true, token });
  } catch (err: any) {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      route: "/auth/login"
    });

    res.status(500).json({ message: "Login failed" });
  }
};
