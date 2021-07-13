import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import videos from "../../Images/aurora.mp4";
import "./Home.css";
const Home = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  return (
    <div style={{ textAlign: "center" }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%,-50%)",
          zIndex: "-1",
        }}
      >
        <source src={videos} type="video/mp4" />
      </video>

      <div style={{ paddingTop: "400px" }}>
        {loginUser.loginUserEmail ? (
          <Link to="/memories">
            <button className="btn btn-success">Now Get Stard</button>
          </Link>
        ) : (
          <Link to="/memories">
            <button className="btn btn-danger">Get Stard</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
