import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import "./CreatingMemories.css";
import axios from "axios";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const CreatingMemories = ({ cart }) => {
  const [loginUser, setLoginUser] = useContext(UserContext);

  ///react hoock from open///
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  ////////////close/////////////
  // creating post
  const [imgUrl, setImgUrl] = useState(null);
  console.log("imgUrl", imgUrl);

  const onSubmit = (data) => {
    const datas = {
      creator: data.creator,
      title: data.title,
      message: data.message,
      tags: data.tags,
      image: imgUrl,
      loginUser: loginUser,
      loginUserEmail: loginUser.loginUserEmail,
      date: new Date().toDateString(),

      Comment: [],
      like: [],
    };

    console.log("datas", datas);

    fetch("http://localhost:1000/addPost", {
      method: "POST",
      body: JSON.stringify(datas),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dataaa", data.data);
        if (data) {
          Swal.fire("Post creating succesfully", "Thnq", "success");
        }
      });
  };
  ///img upload functions open////
  const handelImgUpload = (e) => {
    console.log(e.target.files[0]);
    const imgData = new FormData();
    imgData.set("key", "a0a6964d25e2a5c91f0e5eac3886a4ec");
    imgData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then(function (response) {
        console.log("response", response);
        setImgUrl(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  ///img upload functions close//
  // creating post close
  const handelChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="creating-memories-container " style={{ marginTop: "4%" }}>
      {loginUser.loginUserEmail ? (
        //creating post from open///
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5
              style={{
                textAlign: "center",
                paddingBottom: "1%",
              }}
            >
              Creating a Memory
            </h5>
            <input
              {...register("creator", { required: true })}
              defaultValue={loginUser.loginUserName}
              placeholder="Creator"
              className="form-control"
            />

            {errors.creator && <span>This field is required</span>}
            <br />
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className="form-control"
            />

            {errors.title && <span>This field is required</span>}
            <br />
            <textarea
              {...register("message", { required: true })}
              placeholder="Message"
              className="form-control"
            />

            {errors.message && <span>This field is required</span>}
            <br />
            <input
              {...register("tags", { required: true })}
              placeholder="Tags"
              className="form-control"
              onBlur={(e) => handelChange(e)}
            />

            {errors.tags && <span>This field is required</span>}
            <br />
            <input
              type="file"
              onChange={handelImgUpload}
              // {...register("image", { required: true })}
              className="form-control"
            />
            {/* {errors.image && <span>Image is required</span>} */}
            <br />
            <input type="submit" className="login-btn" />
          </form>
        </>
      ) : (
        ///close//
        <div>
          <p>You have not created an account yet, Please</p>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreatingMemories;
