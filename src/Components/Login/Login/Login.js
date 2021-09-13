// import React from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from "./firebase.config";

// import { useContext } from "react";
// import { UserContext } from "../../../App";

// firebase.initializeApp(firebaseConfig);
// const Login = () => {
//   const [loginUser, setLoginUser] = useContext(UserContext);
//   console.log(loginUser);
//   const history = useHistory();
//   const location = useLocation();
//   const { from } = location.state || { from: { pathname: "/" } };
//   const handelGoogleSignIn = () => {
//     const googleProvider = new firebase.auth.GoogleAuthProvider();

//     firebase
//       .auth()
//       .signInWithPopup(googleProvider)
//       .then((result) => {
//         const user = result.user;

//         const signInUser = {
//           loginUserEmail: user.email,
//           loginUserName: user.displayName,
//           loginUserPhoto: user.photoURL,
//         };
//         setLoginUser(signInUser);
//         history.replace(from);
//         /////////////
//         // sessionStorage.setItem("token", signInUser);
//         ////////////
//       })
//       .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;

//         var email = error.email;

//         var credential = error.credential;
//         console.log(errorCode, errorMessage);
//       });
//   };
//   return (
//     <div>
//       <div className="buttonss">
//         <p style={{ fontFamily: "monospace" }}>Please Sign in</p>
//         <button onClick={handelGoogleSignIn}>Continue with </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../../App";
import { useHistory, useLocation } from "react-router-dom";
import LoginBg from "../../../Images/memories-1.jpg";
import "./Login.css";
const Login = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handelGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const signInUser = {
          loginUserEmail: user.email,
          loginUserName: user.displayName,
          loginUserPhoto: user.photoURL,
        };
        setLoginUser(signInUser);
        history.replace(from);
        /////////////
        // sessionStorage.setItem("token", signInUser);
        ////////////
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        var email = error.email;

        var credential = error.credential;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <section className="login-page">
      <div className=" container">
        <div className="row align-items-center" style={{ height: "100vh" }}>
          <div className="col-md-6 shadow p-5">
            <div className="form-group">
              <label htmlFor="">User Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-danger">
                Forgot your password?
              </label>
            </div>
            <div className="from-group mt-5">
              <button className="login-btn" onClick={handelGoogleSignIn}>
                Google Sign in
              </button>
            </div>
          </div>
          <div className="col-md-6  d-md-block align-self-end">
            <img
              className=""
              src={LoginBg}
              alt=""
              style={{
                width: "100%",
                position: "relative",
                top: "-50px",
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
