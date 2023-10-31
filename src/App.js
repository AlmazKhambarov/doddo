/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./comonents/Home";
import HomePage from "./comonents/HomePage/HomePage";
import SignUp from "./comonents/SignUp";
import { auth } from "./comonents/redux/api";
import { useState } from "react";
import Profile from "./comonents/Profile/Profile";
import UserProfile from "./comonents/UserProfile/UserProfile";

function App() {
  const [user, setUser] = useState();
  let currUser = JSON.parse(localStorage.getItem("currUser"));
  auth.onAuthStateChanged((el) => {
    setUser(el);
    if (!currUser) {
      localStorage.setItem("currUser", JSON.stringify(el));
    }
  });
  console.log(currUser);
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={currUser ? <HomePage user={user} /> : <Home />}
        />
        <Route
          path='/sign-up'
          element={currUser ? <HomePage user={user} /> : <SignUp />}
        />
        <Route
          path='/homepage'
          element={currUser ? <HomePage user={user} /> : <Home />}
        />
        <Route
          path='/profile'
          element={currUser ? <Profile user={user} /> : <Home />}
        />
             <Route
          path='/profile/:id'
          element={currUser ? <UserProfile user={user} /> : <Home />}
        />
      </Routes>
    </>
  );
}

export default App;
