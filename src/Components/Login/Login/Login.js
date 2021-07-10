import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

import { useContext } from "react";
import { UserContext } from "../../../App";

firebase.initializeApp(firebaseConfig);
const Login = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  console.log(loginUser);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const handelGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;

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
    <div>
      <div className="buttonss">
        <p style={{ fontFamily: "monospace" }}>Please Sign in</p>
        <button onClick={handelGoogleSignIn}>Continue with </button>
      </div>
    </div>
  );
};

export default Login;
