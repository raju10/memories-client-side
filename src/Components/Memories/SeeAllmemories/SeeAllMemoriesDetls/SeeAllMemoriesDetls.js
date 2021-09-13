import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";

import DeleteIcon from "@material-ui/icons/Delete";

import { useState } from "react";
import { useForm } from "react-hook-form";

import UpdateIcon from "@material-ui/icons/Update";

import CloseIcon from "@material-ui/icons/Close";
import { UserContext } from "../../../../App";

////
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
//////

const SeeAllMemoriesDetls = ({
  loadPost,
  openModal,
  updates,
  seeAllMemories,
  onSubmit,
  handelPostDelete,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // material ui open//
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //material ui close//

  const [loginUser, setLoginUser] = useContext(UserContext);
  return (
    <div
      className="col-sm-6 col-md-4 col-lg-3 col-xl-3 "
      style={{
        display: "flex",

        justifyContent: "center",
        marginTop: "3%",
      }}
    >
      <Card
        className={classes.root}
        style={{ margin: "20px 0px" }}
        className="memorirs-card"
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img
                src={seeAllMemories.loginUser.loginUserPhoto}
                alt=""
                style={{ width: "50px" }}
              />
            </Avatar>
          }
          action={
            // same delete part open
            <IconButton aria-label="settings">
              {/* <CloseIcon onClick={() => handelPostDelete(seeAllMemories._id)} /> */}
            </IconButton>
            // delete part close
          }
          title={seeAllMemories.creator}
          subheader={seeAllMemories.date}
        />
        <CardMedia
          className={classes.media}
          image={seeAllMemories.image}
          title={seeAllMemories.title}
        />

        <Typography
          variant="body2"
          component="p"
          style={{
            color: "grey",
            fontSize: "12px",
            fontWeight: "650",
            paddingTop: "2%",
            paddingLeft: "5%",
          }}
        >
          {seeAllMemories.tags}
        </Typography>

        <Typography
          variant=""
          component="p"
          style={{
            fontSize: "18px",
            fontWeight: "549",
            paddingTop: "2%",
            paddingLeft: "5%",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            color: "#111",
          }}
        >
          {seeAllMemories.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {seeAllMemories.message}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {/* updated part open*/}
          <IconButton aria-label="" onClick={openModal}>
            {loginUser.loginUserEmail ===
              seeAllMemories.loginUser.loginUserEmail && (
              <UpdateIcon onClick={() => updates(seeAllMemories._id)} />
            )}
          </IconButton>
          {/* updated part close */}
          {/* delete part open*/}
          <IconButton aria-label="share">
            {loginUser.loginUserEmail ===
              seeAllMemories.loginUser.loginUserEmail && (
              <DeleteIcon
                onClick={() => handelPostDelete(seeAllMemories._id)}
              />
            )}
          </IconButton>

          {/* delete part close */}
          {/* comments part open */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MessageIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: "0px 7px" }}
          >
            {/* <input defaultValue="test" {...register("example")} /> */}

            <div style={{ display: "flex" }}>
              <input
                onClick={() => loadPost(seeAllMemories._id)}
                {...register("comments", { required: true })}
                placeholder="Add on Your Comments"
                className="form-control"
              />

              <input type="submit" className="login-btn" />
            </div>
            {errors.comments && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </form>
          {/*  comments part close */}
          <CardContent>
            {seeAllMemories.Comment.map((comment) => (
              <div
                style={{ borderBottom: "1px solid #80808085", padding: "2% 0" }}
              >
                <Typography>
                  <img
                    src={comment.userId.loginUserPhoto}
                    alt=""
                    style={{
                      width: "12%",
                      borderRadius: "100%",
                      marginRight: "2%",
                      border: "1px solid gray",
                    }}
                  />{" "}
                  {comment.comment}
                  {/* <CloseIcon onClick={() => handelCommentDelete(comment.id)} /> */}
                </Typography>
              </div>
            ))}
            {/* <Typography paragraph>{myMemories.message}</Typography> */}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default SeeAllMemoriesDetls;
