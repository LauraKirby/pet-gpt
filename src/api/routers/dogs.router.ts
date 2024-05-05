import { Router } from "express";
import { DogsController } from "../controllers/dogs.controller";

const router = Router();

router.get("/dogs", DogsController.GET);

export default router;
