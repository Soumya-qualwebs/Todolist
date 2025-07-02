import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
 
    console.log("responsettttt", res);
    if (res.ok) {
      router.push("/ex_dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2"
        required
      />
      <br />
      <br />
      <label htmlFor="email">password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2"
        required
      />
      <br />
      <button className="btn btn-primary
      " type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
