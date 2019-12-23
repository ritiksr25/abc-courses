import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
        background: "#fff!important"
    }}>
      <div className="container">
        <Link
          className="navbar-brand tag text-left"
          style={{
            fontWeight: "700",
            color: "#000000",
            fontSize: "25px"
          }}
          to="/"
        >
          ABC COURSES
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav mr-auto nav justify-content-end custom_nav"
            style={{ width: "100%" }}
          >
            {user ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link " to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/orders">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/logout">
                    Log Out
                  </Link>
                </li>
              </React.Fragment>
            ) : (
                <React.Fragment>
                <li className="nav-item">
                <Link className="nav-link " to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link " to="/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/login">
                    Register/Login
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
