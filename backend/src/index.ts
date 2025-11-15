import dotenv from "dotenv";
import path from "path";
// load the backend .env (backend/src -> ../.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app";
import { connectDB } from "./config/db";

(async () => {
  await connectDB();
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000 ✔");
  });
})();
