import { Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const GET = async (req: Request, res: Response) => {
  res.render("index", { firstName: "Ari" });
};

export const POST = async (req: Request, res: Response) => {
  const question = req.body?.question;
  let answer;
  if (!question) res.json({ error: "Start by asking a question" });

  try {
    answer = await callChatGpt(question);

    console.log("\n\n\n\n");
    console.log(answer);
    console.log("\n\n\n\n");

    if (answer?.error) {
      answer = answer.error.message;
    } else if (answer?.choices) {
      answer = answer?.choices.message;
      console.log(answer?.choices);
    }
  } catch (error) {
    console.log(error);
    res.json({ question, error: "something went wrong" });
  }

  res.json({ question, answer });
};

const callChatGpt = async (question) => {
  return await openai.chat.completions.create({
    messages: [{ role: "user", content: question }],
    model: "gpt-3.5-turbo-16k",
  });
};

export const QuestionsController = {
  POST,
  GET,
};
