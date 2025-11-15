import { Router } from "express";
import { signup, login } from "../controllers/authController";
import { validate } from "../middlewares/validateZod";
import { signupSchema, loginSchema } from "../validators/authSchemas";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
