import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserClientInfoContext, UserContext } from "../../../App";
import CreatingMemories from "../CreatingMemories/CreatingMemories";
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

const MemoriesDetls = ({ myMemories }) => {
  const [clientInfo, setClientInfo] = useContext(UserClientInfoContext);
  const [loginUser, setLoginUser] = useContext(UserContext);
  //const [datass, setDatas] = useState({});
  console.log("datassss", clientInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setClientInfo({
      data: data,
      loginUser: loginUser,
    });
    console.log("comment", clientInfo);
    fetch("http://localhost:1000/addPosts", {
      method: "POST",
      body: JSON.stringify(clientInfo),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  /////
  const [userInfo, setUserInfo] = useState([]);
  console.log("userInfo", userInfo);
  // useEffect(() => {
  //   fetch("http://localhost:1000/allUserInfo")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUserInfo(data);
  //     });
  // }, []);

  ///delete///
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
        });
    }
  };
  /////
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //////////////////////

  /////////////////////
  return (
    <div
      className="col-sm-6 col-md-6 col-lg-6 col-xl-4"
      style={{
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <div style={{ display: "none" }}>
        <CreatingMemories datass={datass}></CreatingMemories>
      </div> */}
      <Card className={classes.root} style={{ margin: "20px 0px" }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img
                src={myMemories.loginUser.loginUserPhoto}
                alt=""
                style={{ width: "50px" }}
              />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={myMemories.creator}
          subheader={myMemories.date}
        />
        <CardMedia
          className={classes.media}
          image={myMemories.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {myMemories.message}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <DeleteIcon onClick={() => handelPostDelete(myMemories._id)} />
          </IconButton>
          {/*  */}
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
          {/*  */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {/* <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginLeft: "10px" }}
          >
            <TextField id="standard-basic" label="Add on Your Comments" />
        
              <input type="submit" className="buttons" />
          </form> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input defaultValue="test" {...register("example")} /> */}

            <div style={{ display: "flex" }}>
              <input
                {...register("comments", { required: true })}
                placeholder="Add on Your Comments"
                className="form-control"
              />

              <input type="submit" className="buttons" />
            </div>
            {errors.comments && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </form>

          <CardContent>
            <Typography>Hellow </Typography>
            <Typography paragraph>{myMemories.message}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default MemoriesDetls;
