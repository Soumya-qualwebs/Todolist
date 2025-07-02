// pages/api/login.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const response = await axios.post("https://api.planninggiant.com/v1/login", {
      email_address: email, // ✅ MUST be 'email_address'
      password: password,
    });

    const { token, user } = response.data.data;

    // Send token via cookie (optional)
    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly`);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("External API error:", error.response?.data || error.message);
    res.status(401).json({
      message:
        error.response?.data?.message || "Invalid credentials from API.",
    });
  }
}
