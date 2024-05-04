import cors from "cors";
import express, { Router } from "express";
import { FRONTEND_ALLOWED_ORIGINS } from "./api/config";
import UserRouter from "./api/routers/users.router";
import QuestionRouter from "./api/routers/questions.router";

const app = express();

const corsConfig = {
  origin: FRONTEND_ALLOWED_ORIGINS,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.set("view engine", "ejs");

const router = Router();
router.use(UserRouter);

app.use("/", router);

export { app };
