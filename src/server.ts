import cors from "cors";
import express, { Router } from "express";
import path from "node:path";
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

<<<<<<< Updated upstream
const router = Router();
router.use(UserRouter);

app.use("/", router);

=======
app.use(express.static(path.join(__dirname, "../public")));


app.use("/", router);

app.get("/", (req, res) => {
  console.log("Received question from client:", req.body);
  res.render("index", { firstName: "Ari" });
});

app.post("/", (req, res) => {
  console.log("Received question from client:", req);
  res.send({firstName: "Ari"});
});

>>>>>>> Stashed changes
export { app };
