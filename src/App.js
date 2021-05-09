import React, { useState } from "react";
import { ProfileDetails, SignupSignin } from "ProfileComponents";
import { MultiImage } from "ImageComponents";
import { ProfileContext } from "./ContextsFolder";

import "./App.css";

function App() {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [toggleProfile, setToggleProfile] = useState(0);

  const HandleUser = (user) => {
    setUser(user);
    sessionStorage.setItem("user", user);
    setToggleProfile(0);
  };

  let profContext = { HandleUser: HandleUser, user: user };

  const ToggleProfile = () => {
    if (!toggleProfile) {
      document
        .getElementById("profile-button")
        .classList.remove("button-close");
      document.getElementById("profile-button").classList.add("button-open");
      document
        .getElementById("profile-container")
        .classList.remove("profile-close");
      document
        .getElementById("profile-container")
        .classList.add("profile-open");
      setToggleProfile(1);
    } else {
      document.getElementById("profile-button").classList.remove("button-open");
      document.getElementById("profile-button").classList.add("button-close");
      document
        .getElementById("profile-container")
        .classList.remove("profile-open");
      document
        .getElementById("profile-container")
        .classList.add("profile-close");
      setToggleProfile(0);
    }
  };

  return (
    <ProfileContext.Provider value={profContext}>
      <div className="app-container">
        {user ? (
          <div className="sub-container">
            <button
              id="profile-button"
              className="button-close"
              onClick={() => ToggleProfile()}
            >
              {toggleProfile ? "close profile" : "open profile"}
            </button>
            <div id="profile-container" className="profile-close">
              <ProfileDetails />
            </div>
            <h1>Welcome to Memepo</h1>
            <div className="images-container">
              <MultiImage />
            </div>
          </div>
        ) : (
          <div className="sign-container">
            <SignupSignin />
          </div>
        )}
      </div>
    </ProfileContext.Provider>
  );
}

export default App;
