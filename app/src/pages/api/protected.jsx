// pages/api/protected.js
import cookie from "cookie";

export default function handler(req, res) {
  const { token } = cookie.parse(req.headers.cookie || "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // You can now verify the token, or call the backend with it
  res.status(200).json({ message: "Access granted", token });
}
