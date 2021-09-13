import React, { useContext } from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import CreatingMemories from "../Memories/CreatingMemories/CreatingMemories";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import "./SideNavbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 300,
  },
});

const SideNavbar = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);

  const classes = useStyles();

  const [state, setState] = React.useState({
    right: false,
    top: false,
    left: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      //onKeyDown={toggleDrawer(anchor, false)}
    >
      <CloseIcon
        onClick={toggleDrawer(anchor, false)}
        className="sideNav-closeIcon"
      />
      <div style={{ margin: "10% 3%" }}>
        <>
          {loginUser.loginUserEmail && (
            <>
              <Link to="/login">
                <button className="logout-btn ">
                  Logout - {loginUser.loginUserName}
                </button>
              </Link>
            </>
          )}
        </>

        {"sideNav-container" && <CreatingMemories></CreatingMemories>}
      </div>
    </div>
  );

  return (
    <div className="sideNav-container ">
      {/* "left", "right", "top", "bottom", "doo" */}
      {[""].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideNavbar;
//////////////////////////////////////////////////////////////////

// import React from "react";

// import clsx from "clsx";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// import CreatingMemories from "../Memories/CreatingMemories/CreatingMemories";

// const drawerWidth = 300;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginRight: drawerWidth,
//   },
//   title: {
//     flexGrow: 1,
//   },
//   hide: {
//     display: "none",
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: "flex-start",
//   },
//   // content: {
//   //   flexGrow: 1,
//   //   padding: theme.spacing(3),
//   //   transition: theme.transitions.create("margin", {
//   //     easing: theme.transitions.easing.sharp,
//   //     duration: theme.transitions.duration.leavingScreen,
//   //   }),
//   //   marginRight: -drawerWidth,
//   // },
//   // contentShift: {
//   //   transition: theme.transitions.create("margin", {
//   //     easing: theme.transitions.easing.easeOut,
//   //     duration: theme.transitions.duration.enteringScreen,
//   //   }),
//   //   marginRight: 0,
//   // },
// }));
// const SideNavbar = () => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//   return (
//     <div className={classes.root}>
//       {/* <CssBaseline /> */}
//       <AppBar
//       // position="fixed"
//       // className={clsx(classes.appBar, {
//       //   [classes.appBarShift]: open,
//       // })}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="end"
//             onClick={handleDrawerOpen}
//             className={clsx(open && classes.hide)}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       {/* <main
//         className={clsx(classes.content, {
//           [classes.contentShift]: open,
//         })}
//       >
//         <div className={classes.drawerHeader} />
//       </main> */}
//       <Drawer
//         className={classes.drawer}
//         variant="persistent"
//         anchor="right"
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronLeftIcon />
//             ) : (
//               <ChevronRightIcon />
//             )}
//           </IconButton>
//         </div>

//         <div style={{ padding: "1% 3%" }}>
//           <CreatingMemories></CreatingMemories>
//         </div>
//         <Divider />
//       </Drawer>
//     </div>
//   );
// };

// export default SideNavbar;
