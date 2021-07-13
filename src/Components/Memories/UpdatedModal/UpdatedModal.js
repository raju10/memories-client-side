import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import "./UpdatedModal.css";
// modal open////
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
};

Modal.setAppElement("#root");
////close///
const UpdatedModal = ({ modalIsOpen, closeModal, updates }) => {
  const [creators, setCreators] = useState("");
  const [titles, setTitles] = useState("");
  const [tag, setTag] = useState("");
  const [messages, setMessage] = useState("");
  useEffect(() => {
    setCreators(updates.creator);
    setTitles(updates.title);
    setTag(updates.tags);
    setMessage(updates.message);
  }, []);

  console.log(updates);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
      .then((json) => console.log(json));
  };
  ////////handelPostUpdated ///

  ///close///
  return (
    <section>
      {/* modal open tag*/}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="text-secondary text-center">{updates._id}</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="upldated-modal-form-container"
        >
          <input
            {...register("creator", { required: true })}
            value={creators}
            onChange={(e) => setCreators(e.target.value)}
            placeholder="Creator"
            className="form-control"
          />

          {errors.creator && <span>This field is required</span>}
          <br />
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className="form-control"
            value={titles}
            onChange={(e) => setTitles(e.target.value)}
            name="title"
          />

          {errors.title && <span>This field is required</span>}
          <br />
          <textarea
            {...register("message", { required: true })}
            placeholder="Message"
            className="form-control"
            value={messages}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />

          {errors.message && <span>This field is required</span>}
          <br />
          <input
            {...register("tags", { required: true })}
            placeholder="Tags"
            className="form-control"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            name="tags"
          />

          {errors.tags && <span>This field is required</span>}
          <br />
          {/* <input
            type="file"
            onChange={handelImgUpload}
            {...register("image", { required: true })}
            className="form-control"
          />
          {errors.image && <span>Image is required</span>}
          <br /> */}
          <input type="submit" className="login-btn" />
        </form>
      </Modal>

      {/* close */}
    </section>
  );
};

export default UpdatedModal;
