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

    if (answer?.error) {
      answer = answer.error.message;
    } else if (answer?.choices) {
      answer = answer?.choices[0].message.content;
      console.log(answer);
    }
  } catch (error) {
    console.log(error);
    res.json({ question, error: "something went wrong" });
  }

  res.json({ question, answer });
};

const callChatGpt = async (question) => {
  const expectations = "Expectations: Please provide a concise answer covering the main points.";
  const examples = "Examples: \n- Example 1: Brief response summarizing key points.\n- Example 2: Succinct explanation focusing on relevant details.";
  const encouragement = "Encouragement: We're looking for a brief and to-the-point answer.";
  const prompt = `Question: ${question}\n\n${expectations}\n\n${examples}\n\n${encouragement}\n\nSummary:`;
  return await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo-16k",
    temperature: 0.7, //is set to 0.7 to balance between deterministic and creative responses
    top_p: 0.9,
  });
};

export const QuestionsController = {
  POST,
  GET,
};
