// pages/api/logout.js
import cookie from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 0,
    })
  );

  res.status(200).json({ message: "Logged out" });
}
