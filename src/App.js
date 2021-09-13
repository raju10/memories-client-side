import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Memories from "./Components/Memories/Memories/Memories";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login/Login";
import PrivateRoute from "./Components/Login/Login/PrivateRoute/PrivateRoute";
import SideNavbar from "./Components/SideNavbar/SideNavbar";
import SeeAllmemories from "./Components/Memories/SeeAllmemories/SeeAllmemories";

export const UserContext = createContext();
export const UserClientInfoContext = createContext();
function App() {
  const [loginUser, setLoginUser] = useState({});

  return (
    <UserContext.Provider value={[loginUser, setLoginUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/memories">
            <Memories></Memories>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/sideNav">
            <SideNavbar></SideNavbar>
          </Route>
          <PrivateRoute path="/seeAllMemories">
            <SeeAllmemories></SeeAllmemories>
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
