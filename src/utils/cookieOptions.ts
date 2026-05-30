import { ResponseCookie }
from "next/dist/compiled/@edge-runtime/cookies";

const cookieOptions:
  Partial<ResponseCookie> = {

  httpOnly: true,

  secure:
    process.env.NODE_ENV === "production",

  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "strict",

  maxAge: 30 * 24 * 60 * 60,

  path: "/",
};

export default cookieOptions;