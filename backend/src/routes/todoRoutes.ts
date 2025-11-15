import { Router } from "express";
import { protect } from "../middlewares/authmiddleware";
import { validate } from "../middlewares/validateZod";

import { 
  createTodoSchema, 
  updateTodoSchema 
} from "../validators/todoSchemas";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleTodo
} from "../controllers/todoController";

const router = Router();

router.post("/", protect, validate(createTodoSchema), createTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, validate(updateTodoSchema), updateTodo);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id/toggle", protect, toggleTodo);

export default router;
