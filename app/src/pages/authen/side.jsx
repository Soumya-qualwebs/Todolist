import React from "react";
import Link from "next/link";
const Side = ({ sidebarItems }) => {
  return (
    <>
      <div
        className="bg-light border-end position-fixed"
        style={{ width: "250px", height: "100vh", zIndex: 1000 }}
      >
        <div className="p-3 border-bottom">
          <div className="position-relative">
            <input
              type="search"
              placeholder="Search"
              className="form-control pe-5"
            />
            <i
              className="bi bi-search position-absolute"
              style={{
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "1.2rem",
                color: "#6c757d",
              }}
            ></i>
          </div>
        </div>

        <div className="p-3">
          <ul className="list-group list-group-flush">
            {sidebarItems?.map(([icon, label], i) => (
              <Link href={`/authen/${label}`} key={i} className="list-group-item border-0 p-2">
                <i className={`bi bi-${icon} me-2`}></i> {label}
              </Link>
            ))}
          </ul>
          <button className="btn btn-primary">Log out</button>
        </div>
      </div>
      <button className="btn btn-primary">Log out</button>
    </>
  );
};

export default Side;
