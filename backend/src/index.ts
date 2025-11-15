import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

connectDB();

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 ✔");
});
