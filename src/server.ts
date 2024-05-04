import cors from "cors";
import express, { Router } from "express";
import { FRONTEND_ALLOWED_ORIGINS } from "./api/config";
import UserRouter from "./api/routers/users.router";

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
const router = Router();
router.use(UserRouter);

app.set("view engine", "ejs");

app.use("/", router);

app.get("/", (req, res) => {
  res.render("index", { firstName: "Ari" });
});

export { app };
