import React, { useEffect, useState } from "react";
import MemoriesDetls from "../MemoriesDetls/MemoriesDetls";
import CreatingMemories from "../CreatingMemories/CreatingMemories";
import UpdatedModal from "../UpdatedModal/UpdatedModal";
import Neww from "../Neww";
import Headers from "../Headers/Headers";
import "./Memories.css";
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
  //updated///
  const [updates, setUpdates] = useState({});

  const loadPost = (id) => {
    console.log(id);
    let url = `http://localhost:1000/postes/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("updated successfully", data);
        // const updated = document.getElementById("update");
        // updated.innerHTML = `
        //   <h3>Updated : ${data._id}</h3>
        //   <input type="text" value="${data.title}"/>
        //   `;
        setUpdates(data);
      })
      .then((success) => {
        if (success) {
          closeModal();
          // alert('Appointment created successfully.');
        }
      });
  };

  ////modal//

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  //close//

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
        {/* <div>
        <Neww></Neww>
      </div> */}
      </div>
    </section>
  );
};

export default Memories;
