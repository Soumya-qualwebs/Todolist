import React from "react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center sticky-top">
      <div>
        <button
          className="btn btn-outline-primary me-3"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>
        <i className="bi bi-bank me-2"></i>
        <h4 className="d-inline">Theme Management</h4>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary">Code Editor</button>
        <button className="btn btn-primary text-white">Theme Setting</button>
      </div>
    </div>
  );
};

export default Navbar;
