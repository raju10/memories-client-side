import React, { useState } from "react";
import { useEffect } from "react";

const Neww = () => {
  const [myMemories, setMyMemories] = useState([]);
  console.log("myMemories", myMemories);
  useEffect(() => {
    fetch("http://localhost:1000/allPost")
      .then((res) => res.json())
      .then((data) => {
        setMyMemories(data);
      });
  }, []);
  return (
    <div>
      <img src={myMemories.image} alt="" style={{ width: "100px" }} />
    </div>
  );
};

export default Neww;
