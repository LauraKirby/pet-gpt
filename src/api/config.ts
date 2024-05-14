import dotenv from "dotenv";
dotenv.config({
  path: `./.env${
    process.env.NODE_ENV && process.env.NODE_ENV === "production"
      ? null
      : process.env.NODE_ENV
      ? `.${process.env.NODE_ENV}`
      : ".development"
  }`,
});

const FRONTEND_ALLOWED_ORIGINS = JSON.parse(process.env.FRONTEND_ALLOWED_ORIGINS || "");

const PORT = process.env.PORT ?? 4000;

if (!FRONTEND_ALLOWED_ORIGINS) {
  throw new Error(
    "Missing FRONTEND_ALLOWED_ORIGINS env value, should be an array of strings"
  );
}

export {
  FRONTEND_ALLOWED_ORIGINS,
  PORT
};

