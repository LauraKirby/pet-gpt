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

const ORIGINS = process.env.VITE_FRONTEND_ALLOWED_ORIGINS
  ? process.env.VITE_FRONTEND_ALLOWED_ORIGINS
  : process.env.FRONTEND_ALLOWED_ORIGINS
  ? process.env.FRONTEND_ALLOWED_ORIGINS
  : "[]";
const FRONTEND_ALLOWED_ORIGINS = JSON.parse(ORIGINS);
const COOKIE_DOMAIN = process.env.VITE_COOKIE_DOMAIN
  ? process.env.VITE_COOKIE_DOMAIN
  : process.env.COOKIE_DOMAIN
  ? process.env.COOKIE_DOMAIN
  : "localhost";
const PORT = process.env.PORT ?? 4000;

const TOKEN_EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 7;
if (!FRONTEND_ALLOWED_ORIGINS) {
  throw new Error(
    "Missing FRONTEND_ALLOWED_ORIGINS env value, should be an array of strings"
  );
}
if (!COOKIE_DOMAIN) {
  throw new Error("Missing COOKIE_DOMAIN env value.");
}

export {
  COOKIE_DOMAIN,
  FRONTEND_ALLOWED_ORIGINS,
  PORT,
  TOKEN_EXPIRATION_IN_SECONDS,
};
