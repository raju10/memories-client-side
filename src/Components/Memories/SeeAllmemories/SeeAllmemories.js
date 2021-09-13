import React, { useContext, useEffect, useState } from "react";
import Headers from "../Headers/Headers";
import SeeAllMemoriesDetls from "./SeeAllMemoriesDetls/SeeAllMemoriesDetls";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
const SeeAllmemories = ({
  // loadPost,
  handelPostDelete,
  openModal,
  updates,
  onSubmit,
  myMemories,
}) => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  console.log("myMemoriesss", myMemories);
  //all memories open
  const [seeAllMemories, setAllMemories] = useState([]);
  console.log("seeAllMemories", seeAllMemories);
  useEffect(() => {
    fetch("http://localhost:1000/allPost")
      .then((res) => res.json())
      .then((data) => {
        setAllMemories(data);
      });
  }, []);
  //all memories close
  return (
    <div className="container">
      <Headers></Headers>

      <div className="row " style={{ marginTop: "9%" }}>
        <h2 style={{}}>
          <Link
            to="/memories"
            style={{
              position: "fixed",
              fontSize: "16px",
              background: "#111",
              padding: "10px 30px",
              borderRadius: "200px",
              color: "#00b7ff",
              fontWeight: "500",
            }}
          >
            MY - MEMORIES
          </Link>
        </h2>
        {seeAllMemories.map((seeAllMemories) => (
          <SeeAllMemoriesDetls
            seeAllMemories={seeAllMemories}
            // loadPost={loadPost}
            openModal={openModal}
            updates={updates}
            onSubmit={onSubmit}
            handelPostDelete={handelPostDelete}
          ></SeeAllMemoriesDetls>
        ))}
      </div>
    </div>
  );
};

export default SeeAllmemories;
