import { Request, Response } from "express";

export const GET = async (req: Request, res: Response) => {
  return {
    id: 4072,
    uid: "c7204a53-77be-4ba6-b446-8f92921060a0",
    first_name: "Lorenzo",
    last_name: "Fay",
    username: "rosie",
    email: "rosie@email.com",
  };
};

export const UsersController = {
  GET,
};
