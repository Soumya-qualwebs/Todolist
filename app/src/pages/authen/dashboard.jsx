"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Side from "./Side";
import MainComponent from "./MainComponent";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (!cookieToken) {
      router.push("/authen/login");
    } else {
      setToken(cookieToken);
      console.log("Dashboard Token from Cookie:", cookieToken);
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/authen/login");
  };

  const sidebarItems = [
    ["house", "Dashboarsfdsfdd"],
    ["person-lines-fill", "To-Do-List"],
    ["apple", "sdfsd"],
    ["award", "Promsdfsdfotions"],
    ["bag-fill", "Reports"],
    ["bank", "Settings"],
    ["boombox", "News"],
    ["cart2", "Logout"],
  ];

  return (
    <div className="d-flex">
      {sidebarOpen ? <Side sidebarItems={sidebarItems} /> : null}

      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "250px" : 0,
          transition: "margin-left 0.3s",
        }}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4">
          <MainComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
