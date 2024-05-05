import { Request, Response } from "express";
import OpenAI from "openai";

export const GET = async (req: Request, res: Response) => {
  res.render("index", { firstName: "Ari" });
};

export const POST = async (req: Request, res: Response) => {
  const question = req.body?.question;
  let answer;
  if (!question) res.json({ error: "Start by asking a question" });

  try {
    const openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });

    const q = "dog behavior problems";
    answer = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo-16k",
    });

    console.log("\n\n\n\n");
    console.log(answer);
    console.log("\n\n\n\n");

    if (answer?.error) {
      answer = answer.error.message;
    }
  } catch (error) {
    console.log(error);
    res.json({ question, error: "something went wrong" });
  }

  res.json({ question, answer });
};

export const QuestionsController = {
  POST,
  GET,
};
