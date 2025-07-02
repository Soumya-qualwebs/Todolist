// "use client";

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [Token, setToken] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setMessage("");
//     setResponseData(null);

//     try {
//       const res = await axios.post("https://api.planninggiant.com/v1/login", {
//         email_address: email,
//         password: password,
//       });

//       const data = res.data;
//       setResponseData(data);
//       setMessage("Login successful!");
//       if (data?.data?.token) {
      
//       console.log("Token stored:", data.data.token);
//       localStorage.setItem("token", data.data.token);
//       setToken(data.data.token)
      
//     } else {
//       console.warn("No token found in API response");
//       c

//     }


//       localStorage.setItem("token", data.token);



//       console.log("Token:", data.token);
//       router.push("/authen/dashboard");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please check credentials."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (responseData) {
//       console.log(
//         "API Response (JSON):",
//         JSON.stringify(responseData, null, 2)
//       );
//     }
//   }, [responseData]);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Enter Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             classNameName="border-2"
//             required
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="password">Enter Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             classNameName="border-2"
//             required
//           />
//         </div>
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {message && <p style={{ color: "green" }}>{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;



// cookies code        //



// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie"; 

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [responseData, setResponseData] = useState(null);

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setMessage("");
//     setResponseData(null);

//     try {
//       const res = await axios.post("https://api.planninggiant.com/v1/login", {
//         email_address: email,
//         password: password,
//       });

//       const data = res.data;
//       setResponseData(data);
//       setMessage("Login successful!");

//       if (data?.data?.token) {
//         Cookies.set("token", data.data.token, {
//           expires: 7, 
//           secure: true,
//           sameSite: "Strict",
//         });

//         console.log("Token stored in cookies:", data.data.token);
//         router.push("/authen/dashboard");
//       } else {
//         console.warn("No token found in response.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please check credentials."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Enter Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             classNameName="border-2"
//             required
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="password">Enter Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             classNameName="border-2"
//             required
//           />
//         </div>
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {message && <p style={{ color: "green" }}>{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setshowPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setResponseData(null);
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

  

    
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.planninggiant.com/v1/login",
        {
          email_address: email,
          password: password,
        }
      );

      localStorage.setItem("email",email);

      const data = response.data;
      setResponseData(data);
      setMessage("Login successful");

      if (data?.data?.token) {
        Cookies.set("token", data.data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        console.log("Token stored in cookies:", data.data.token);
        router.push("/authen/dashboard");
      } else {
        console.warn("No token found in response.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-100 min-h-screen bg-gray-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="Email address"
                        />

                        {emailError && (
                          <p className="text-danger">{emailError}</p>
                        )}
                      </div>

                      <div className="form-outline mb-4 position-relative">
                        <label className="form-label" htmlFor="email">
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control pe-5"
                          placeholder="Password"
                        />
                        

                        {/* 👁️ Eye icon */}
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye" : "bi-eye-slash"
                          } position-absolute`}
                          style={{
                            top: "20%",
                            right: "15px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            zIndex: 10,
                            fontSize: "1.2rem",
                            color: "#6c757d",
                          }}
                          onClick={() => setshowPassword((prev) => !prev)}
                        ></i>

                        {passwordError && (
                          <p className="text-danger">{passwordError}</p>
                        )}
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check mb-0">
                          <input
                            class="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3"
                          />
                          <label class="form-check-label" for="form2Example3">
                            Remember me
                          </label>
                        </div>
                        <a href="#!" class="text-body">
                          Forgot password?
                        </a>
                      </div>

                      <div className="text-center  mb-5 pt-4 pb-1">
                        <button
                          className="btn btn-primary btn-block mb-3 w-100"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <div
                              class="spinner-border text-danger"
                              role="status"
                              style={{ height: "20px", width: "20px" }}
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>

                        {error && <p className="text-danger">{error}</p>}
                        {message && <p className="text-success">{message}</p>}
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                        >
                          Create new
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 via-pink-500 col-lg-6 d-flex items-center bg-fuchsia-400">
                  <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                    <h1 className="mb-4">Login with Security</h1>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
