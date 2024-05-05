import { Request, Response } from "express";
const fs = require("node:fs");

export const GET = async (req: Request, res: Response) => {
  let dogDetails;
  // const params = req.query;
  console.log("params: ", req.query);

  try {
    dogDetails = await getAnswers("poodle", "1_month_away", "san_francisco");
  } catch (error) {
    console.log(error);
    res.render("error");
  }

  res.render("answer", {
    breed: "poodle",
    adoptionDate: "1 week",
    location: "san_francisco",
    supplies: ["crate", "food", "toothbrush", "toothpaste"],
    medical: [
      {
        spay_and_neuter:
          "Sterilization is considered a routine surgery because of its significant impact on animal welfare. The benefits of spaying and neutering include controlling the pet population, preventing certain diseases, and reducing behavioral problems. Preventing pet overpopulation is one of the most significant benefits. Each year, millions of unwanted shelter animals are euthanized. Controlling the pet population combats this tragedy. By spaying and neutering, owners can prevent their pets from contributing to the problem.",
      },
      {
        vaccinations:
          "There are 3 rounds of core vaccines needed to keep a puppy healthy",
      },
      {
        deworming:
          "Puppies should be wormed every two weeks until twelve weeks of age, then monthly until six months of age. Once they have reached six months of age, a puppy can transfer onto an 'adult' worming schedule.",
      },
    ],
    training: [
      {
        leash:
          "Zak George has some great content on positive reinforcement around training your dog to walk comfortably on a leash",
      },
      {
        crate:
          "What is crate training? It’s the process of helping your dog learn to spend time in their crate—and ultimately, to adopt it as their own personal space in your home. Crate training taps into your pup’s natural inclination to keep their sleeping space clean—they’re less likely to go potty where they hang out and sleep. Using a crate has benefits beyond just potty training, too; it also helps to keep your dog safe and out of mischief when you’re not around to supervise them, plus it provides a comfy retreat when household hubbub gets overwhelming and your pup wants to relax.",
      },
    ],
    community: ["reddit forums", "facebook groups"],
    breed_details:
      "Whether Standard, Miniature, or Toy, and either black, white, or apricot, the Poodle stands proudly among dogdom's true aristocrats. Beneath the curly, low-allergen coat is an elegant athlete and companion for all reasons and seasons.",
  });
};

const getAnswers = async (
  breed: string,
  adoptionDate: string,
  location: string
) => {
  return fs.readFile(
    `../../tests/${breed}/${adoptionDate}/${location}.json`,
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    }
  );
};

export const DogsController = {
  GET,
};
