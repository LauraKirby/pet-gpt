import { Request, Response } from "express";

export const GET = async (req: Request, res: Response) => {
  res.render("index", { firstName: "Ari" });
};

export const POST = async (req: Request, res: Response) => {
  console.log("ask OpenAOI a question");
  console.log("Received question from client:", req.body);
  res.json(req.body);
};

export const QuestionsController = {
  POST,
  GET,
};
