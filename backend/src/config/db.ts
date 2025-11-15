import path from "path";
import mongoose from "mongoose";

// remove dotenv here — index.ts already loads .env

function buildUriFromEnv() {
  const envUriRaw = process.env.MONGO_URI?.trim();
  if (envUriRaw && envUriRaw !== "") {
    const envUri = envUriRaw;

    // Reject common misconfigs
    if (/[<>]/.test(envUri)) {
      throw new Error(
        "MONGO_URI contains angle-bracket placeholders like <user> or <pass>. Remove '<' and '>' and set real credentials in .env."
      );
    }
    if (/\/\/@/.test(envUri)) {
      throw new Error(
        "MONGO_URI contains an empty userinfo section (looks like mongodb+srv://@...). Add username/password or fix the MONGO_URI."
      );
    }

    // If URI has no DB path (ends with host/), append default 'test'
    const [base, query = ""] = envUri.split("?");
    const baseNoTrailing = base.replace(/\/+$/, "");
    const hasDbPath = /\/[^\/]+$/.test(base);
    if (!hasDbPath) {
      const queryPart = query ? `?${query}` : "";
      return `${baseNoTrailing}/test${queryPart}`;
    }

    return envUri;
  }

  const user = process.env.MONGO_USER || "";
  const rawPassword = process.env.MONGO_PASSWORD || "";
  const host = process.env.MONGO_HOST || "cluster0.mongodb.net";
  const dbName = process.env.MONGO_DB || "test";

  if (!user || !rawPassword) {
    throw new Error(
      "Missing MONGO_URI or MONGO_USER/MONGO_PASSWORD in environment."
    );
  }

  const password = encodeURIComponent(rawPassword); // handles special chars
  const userEnc = encodeURIComponent(user);

  return `mongodb+srv://${userEnc}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
}

const uri = buildUriFromEnv();

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err: any) {
    console.error("MongoDB Connection Failed:", err.message || err);
    throw err;
  }
}
