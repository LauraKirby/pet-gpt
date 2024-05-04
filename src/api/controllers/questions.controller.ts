import { Request, response, Response } from "express";

export const GET = async (req: Request, res: Response) => {
  res.render("index", { firstName: "Ari" });
};

export const POST = async (req: Request, res: Response) => {
  console.log("ask OpenAOI a question");
  console.log("Received question from client:", req.body);
  const response = {
    question: req.body.question,
    answer: "hire a trainer"
  }
  res.json(response);
};

export const QuestionsController = {
  POST,
  GET,
};
