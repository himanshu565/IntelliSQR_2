import { ErrorLog } from "../models/ErrorLog";

export const logError = async (err: any) => {
  await ErrorLog.create({
    message: err.message,
    stack: err.stack,
  });
};
