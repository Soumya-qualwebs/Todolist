import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const MainComponent = () => {
  const [Image, setImage] = useState([]);
  const [token, setToken] = useState("");
  const router = useRouter();

  const getImages = async () => {
   
    try {
      const response = await axios.get("https://picsum.photos/v2/list");
      setImage(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    const cookieToken = Cookies.get("token");

    if (!cookieToken) {
      router.push("/authen/login");
    } else {
      setToken(cookieToken);
      console.log("Dashboard Token from Cookie:", cookieToken);
    }
    getImages();
  }, [router]);
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/authen/login");
  };
  return (
    <div className="container">
      <div className="row">
        {Image.map((elem, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={elem.download_url}
                alt={elem.author}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{elem.author}</h5>
                <p className="card-text">ID: {elem.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
       <button className="btn btn-danger mb-4" onClick={handleLogout}>
                  Logout
                </button>
    </div>
  );
};

export default MainComponent;
