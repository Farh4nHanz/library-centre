import { Router } from "express";
import { UserRole } from "@/constants";
import { bookController } from "@/controllers/bookController";
import { access, isAuth } from "@/middlewares/authMiddleware";

const router = Router();

router
  .get("/", bookController.getAllBooks)
  .post("/", isAuth, access([UserRole.admin]), bookController.addNewBook);

export default router;
