import { Request, Response } from "express";

export const GET = async (req: Request, res: Response) => {
  console.log("here in the users controller");
  res.render("index", { firstName: "Ari" });
};

export const UsersController = {
  GET,
};
