import React, { useState, useContext } from "react";
import { ProfileContext } from "ContextsFolder";
import { HandleSignin, HandleSignup } from "Backend";

export const SignupSignin = () => {
  const { HandleUser } = useContext(ProfileContext);
  const [message, setMessage] = useState("");
  const [signup, setSignup] = useState(1);

  const ShowSignup = () => {
    setSignup(1);
  };

  const ShowSignin = () => {
    setSignup(0);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let cpassword;
    if (signup) {
      cpassword = e.target.cpassword.value;
    }

    if (signup) {
      if (password !== cpassword) {
        setMessage("passwords do not match");
      } else {
        let signupSuccess = await HandleSignup(username, password);
        if (signupSuccess !== "success") {
          setMessage(signupSuccess);
          return;
        } else {
          HandleUser(username);
        }
      }
    } else {
      let signinSuccess = await HandleSignin(username, password);
      if (signinSuccess !== "success") {
        setMessage(signinSuccess);
      } else {
        HandleUser(username);
      }
    }
  };

  return (
    <div className="user-sign-form">
      <button onClick={() => ShowSignup()}>Sign up</button>
      <button onClick={() => ShowSignin()}>Sign in</button>
      {signup ? (
        <form onSubmit={(e) => HandleSubmit(e)}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input
            type="password"
            name="cpassword"
            placeholder="confirm password"
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <form onSubmit={(e) => HandleSubmit(e)}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <button type="submit">submit</button>
        </form>
      )}
      {message}
    </div>
  );
};
