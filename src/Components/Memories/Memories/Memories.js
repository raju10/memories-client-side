import React, { useEffect, useState } from "react";
import MemoriesDetls from "../MemoriesDetls/MemoriesDetls";
import CreatingMemories from "../CreatingMemories/CreatingMemories";
const Memories = () => {
  const [myMemories, setMyMemories] = useState([]);
  console.log("myMemories", myMemories);
  useEffect(() => {
    fetch("http://localhost:1000/allPost")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyMemories(data);
      });
  }, []);
  /////

  ////
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-xl-8 col-lg-7 col-md-7 ">
          <div className="row">
            {myMemories.map((myMemories) => (
              <MemoriesDetls
                myMemories={myMemories}
                key={myMemories._id}
              ></MemoriesDetls>
            ))}

            {/* <MemoriesDetls></MemoriesDetls>
            <MemoriesDetls></MemoriesDetls>
            <MemoriesDetls></MemoriesDetls> */}
          </div>
        </div>
        <div className="col-sm-12 col-xl-4 col-lg-5 col-md-5 ">
          <CreatingMemories></CreatingMemories>
        </div>
      </div>
    </div>
  );
};

export default Memories;
