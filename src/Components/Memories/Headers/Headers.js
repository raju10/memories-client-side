import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import memoriesLogo from "../../../Images/memories.png";
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
        </Link>
        <h2>MEMORIES</h2>
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
    </section>
  );
};

export default Headers;
