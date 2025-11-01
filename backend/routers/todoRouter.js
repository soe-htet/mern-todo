import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getToDos,
  toggleTodo,
} from "../controllers/todoController.js";

const router = Router();

router.route("/").get(getToDos).post(createTodo);

router.route("/:id").put(toggleTodo).delete(deleteTodo);

export default router;
