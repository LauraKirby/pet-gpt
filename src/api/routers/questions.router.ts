import { Router } from "express";
import { QuestionsController } from "../controllers/questions.controller";

const router = Router();

router.get("/questions", QuestionsController.POST);

export default router;
