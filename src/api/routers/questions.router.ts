import { Router } from "express";
import { QuestionsController } from "../controllers/questions.controller";

const router = Router();

router.post("/", QuestionsController.POST);
router.get("/", QuestionsController.GET);

export default router;
