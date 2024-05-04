import { Request, Response } from "express";

export const POST = async (req: Request, res: Response) => {
  console.log("ask OpenAOI a question");
  res.render("answer", { firstName: "Ari" });
};

export const QuestionsController = {
  POST,
};
