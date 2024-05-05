import cors from "cors";
import express, { Router } from "express";
import path from "node:path";
import { FRONTEND_ALLOWED_ORIGINS } from "./api/config";
import DogsRouter from "./api/routers/dogs.router";
import QuestionsRouter from "./api/routers/questions.router";

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
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");

const router = Router();
router.use(QuestionsRouter);
router.use(DogsRouter);

app.use("/", router);

export { app };
