import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Link to="/memories">
        <button className="btn btn-success">Get Stard</button>
      </Link>
    </div>
  );
};

export default Home;
