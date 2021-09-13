import React, { useContext, useEffect, useState } from "react";
import MemoriesDetls from "../MemoriesDetls/MemoriesDetls";
import CreatingMemories from "../CreatingMemories/CreatingMemories";
import UpdatedModal from "../UpdatedModal/UpdatedModal";

import Headers from "../Headers/Headers";
import "./Memories.css";
import { UserContext } from "../../../App";
import { useForm } from "react-hook-form";
import LikeDislike from "../../LikeDislike";
import SeeAllmemories from "../SeeAllmemories/SeeAllmemories";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Memories = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  const [myMemories, setMyMemories] = useState([]);
  const [commentReload, setCommentReload] = useState("");
  const [deleteReload, setDeleteReload] = useState("");
  const [updatedReload, setUpdatedReload] = useState("");
  const [postReload, setPostReload] = useState("");
  const [updates, setUpdates] = useState({});
  console.log("myMemories", myMemories);
  useEffect(() => {
    fetch(
      "http://localhost:1000/myPost?loginUserEmail=" + loginUser.loginUserEmail
      // "http://localhost:1000/myPost"
    )
      .then((res) => res.json())
      .then((data) => {
        setMyMemories(data);
      });
  }, [commentReload, loginUser, deleteReload, updatedReload, postReload]);

  //updated part///

  //const [updates, setUpdates] = useState({});
  const loadPost = (id) => {
    // console.log(id);
    let url = `http://localhost:1000/postes/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("updated successfully", data);

        setUpdates(data);
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
  // like part //
  const id = updates._id;
  const datas = {
    likes: { id, like: updates.like },
    // id: id,
  };

  console.log("likes", datas);

  // fetch(`http://localhost:1000/like/${id}`, {
  //   method: "PATCH",
  //   body: JSON.stringify(datas),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setCommentReload(data);
  //     console.log(data);
  //   });

  // like part close //
  //comment from submit//

  const onSubmit = (data, e) => {
    const id = updates._id;
    const datas = {
      comments: { userId: loginUser, id, comment: data.comments },
      // id: id,
    };
    console.log(datas);

    fetch(`http://localhost:1000/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(datas),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCommentReload(data);
        console.log(data);
      });
    e.target.reset();
  };

  //comment from submit close//
  ///delete part open///

  const handelPostDelete = (id) => {
    console.log(id);

    if (window.confirm("Are you sure you wan't to delete this post")) {
      fetch("http://localhost:1000/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("deleted successfully", data);

          setDeleteReload(data.data);
        });
    }
  };
  // delete part close //
  // updated final part //

  const onSubmits = (data, e) => {
    console.log(data);
    const id = updates._id;
    const datas = {
      creator: data.creator,
      title: data.title,
      message: data.message,
      tags: data.tags,

      id: id,
    };
    console.log(datas);
    fetch(`http://localhost:1000/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(datas),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUpdatedReload(json);
      });
    e.target.reset();
  };

  // updated final part close //

  return (
    <section className="memories-container">
      <Headers myMemories={myMemories}></Headers>
      <div className="container cards-memories-wrapper">
        <div className="row">
          <div className="col-sm-12 col-xl-8 col-lg-7 col-md-7 ">
            {myMemories.length === 0 && (
              <div className="row">
                <h2
                  style={{
                    color: "#941414",
                    textAlign: "center",
                    paddingTop: "10%",
                  }}
                >
                  Please login & creating a post <br /> Then see your memories
                </h2>

                <div style={{ display: "none" }}>
                  <SeeAllmemories
                    // loadPost={loadPost}
                    openModal={openModal}
                    updates={updates}
                    onSubmit={onSubmit}
                    myMemories={myMemories}
                    handelPostDelete={handelPostDelete}
                  ></SeeAllmemories>
                </div>
              </div>
            )}
            <div className="row">
              <h2 style={{ marginBottom: "6%" }}>
                <Link
                  to="/seeAllMemories"
                  style={{
                    position: "fixed",
                    fontSize: "16px",
                    background: "#111",
                    padding: "10px 30px",
                    borderRadius: "200px",
                    color: "#00b7ff",
                    fontWeight: "500",
                    marginTop: "1% ",
                  }}
                >
                  SEE - ALL - MEMORIES
                </Link>
              </h2>

              {myMemories.map((myMemories) => (
                <MemoriesDetls
                  loadPost={loadPost}
                  openModal={openModal}
                  myMemories={myMemories}
                  key={myMemories._id}
                  updates={updates}
                  onSubmit={onSubmit}
                  handelPostDelete={handelPostDelete}
                ></MemoriesDetls>
              ))}
            </div>
          </div>
          <div className="col-sm-12 col-xl-4 col-lg-5 col-md-5 rajuu">
            {"rajuu" && <CreatingMemories></CreatingMemories>}
          </div>
        </div>
        <UpdatedModal
          updates={updates}
          key={updates._id}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          // onSubmit={onSubmit}
          onSubmit={onSubmits}
        ></UpdatedModal>
      </div>
      {/* <LikeDislike></LikeDislike> */}
    </section>
  );
};

export default Memories;
