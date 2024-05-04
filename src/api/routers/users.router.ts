import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();

router.get("/users/:uid", UsersController.GET);

export default router;
