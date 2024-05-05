import { Request, Response } from "express";
const fs = require("node:fs");

export const GET = async (req: Request, res: Response) => {
  let dogDetails;
  const { breed, adoptionDate, location } = req.query;
  console.log("req.query: ", req.query);
  try {
    dogDetails = await getAnswers(
      breed as string,
      adoptionDate as string,
      location as string
    );
  } catch (error) {
    console.log(error);
    res.render("error");
  }
  res.render("answer", JSON.parse(dogDetails));
};

const getAnswers = async (
  breed: string,
  adoptionDate: string,
  location: string
) => {
  console.log(
    "file path: ",
    `src/tests/factories/${breed}/${location}/${adoptionDate}.json`
  );
  return fs.readFileSync(
    `src/tests/factories/${breed}/${location}/${adoptionDate}.json`,
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("data read: ", data);
      return data;
    }
  );
};

export const DogsController = {
  GET,
};
