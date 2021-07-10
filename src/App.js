import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Memories from "./Components/Memories/Memories/Memories";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login/Login";
import PrivateRoute from "./Components/Login/Login/PrivateRoute/PrivateRoute";
import Neww from "./Components/Memories/Neww";
export const UserContext = createContext();
export const UserClientInfoContext = createContext();
function App() {
  const [loginUser, setLoginUser] = useState({});
  const [clientInfo, setClientInfo] = useState([]);
  return (
    <UserClientInfoContext.Provider value={[clientInfo, setClientInfo]}>
      <UserContext.Provider value={[loginUser, setLoginUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <PrivateRoute path="/memories">
              <Memories></Memories>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/new">
              <Neww></Neww>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </UserClientInfoContext.Provider>
  );
}

export default App;
