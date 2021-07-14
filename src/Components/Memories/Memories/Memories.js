import React, { useEffect, useState } from "react";
import MemoriesDetls from "../MemoriesDetls/MemoriesDetls";
import CreatingMemories from "../CreatingMemories/CreatingMemories";
import UpdatedModal from "../UpdatedModal/UpdatedModal";

import Headers from "../Headers/Headers";
import "./Memories.css";
const Memories = () => {
  const [myMemories, setMyMemories] = useState([]);
  console.log("myMemories", myMemories);
  useEffect(() => {
    fetch("http://localhost:1000/allPost")
      .then((res) => res.json())
      .then((data) => {
        setMyMemories(data);
      });
  }, []);
  //updated part///
  const [updates, setUpdates] = useState({});

  const loadPost = (id) => {
    // console.log(id);
    let url = `http://localhost:1000/postes/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("updated successfully", data);
        setUpdates(data);
      })
      .then((success) => {
        if (success) {
          closeModal();
          // alert('Appointment created successfully.');
        }
      });
  };
  // updated part close//
  ////modal part//

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  //modal part close//

  return (
    <section className="memories-container">
      <Headers></Headers>
      <div className="container cards-memories-wrapper">
        <div className="row">
          <div className="col-sm-12 col-xl-8 col-lg-7 col-md-7 ">
            <div className="row">
              {myMemories.map((myMemories) => (
                <MemoriesDetls
                  loadPost={loadPost}
                  openModal={openModal}
                  myMemories={myMemories}
                  key={myMemories._id}
                  updates={updates}
                ></MemoriesDetls>
              ))}
            </div>
          </div>
          <div className="col-sm-12 col-xl-4 col-lg-5 col-md-5 ">
            <CreatingMemories></CreatingMemories>
          </div>
        </div>
        <UpdatedModal
          updates={updates}
          key={updates._id}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        ></UpdatedModal>
      </div>
    </section>
  );
};

export default Memories;
