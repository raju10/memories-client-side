import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import memoriesLogo from "../../../Images/memories.png";
import SideNavbar from "../../SideNavbar/SideNavbar";
import "./Headers.css";
const Headers = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  return (
    <section className="header-container container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/home">
          {" "}
          <img src={memoriesLogo} alt="" style={{ width: "50px" }} />
        </Link>{" "}
        <h2 id="memories-title">
          {
            <Link
              to="/memories"
              style={{ textDecoration: "none", color: "#00b7ff" }}
              id="yoo"
            >
              MEMORIES
            </Link>
          }
        </h2>
        <div className="login-logout-btn" style={{}}>
          {loginUser.loginUserEmail ? (
            <>
              <Link to="/login">
                <button className="logout-btn ">
                  Logout - {loginUser.loginUserName}
                </button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
        <SideNavbar></SideNavbar>
      </div>
    </section>
  );
};

export default Headers;
