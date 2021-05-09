import React, { useState, useContext, useEffect } from "react";
import { ProfileContext } from "ContextsFolder";
import { HandleAddImage, HandleUploadImage } from "Backend";

export const AddImage = () => {
  let { user } = useContext(ProfileContext);
  const [fileURL, setFileURL] = useState("");

  useEffect(() => {
    if (document.getElementById("img-input").value) {
      document.getElementById("img-submit").disabled = false;
    } else {
      document.getElementById("img-submit").disabled = true;
    }
  }, [fileURL]);

  const onChange = async (e) => {
    const file = e.target.files[0];
    setFileURL(await HandleUploadImage(file));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    HandleAddImage(user, fileURL, title);
    document.getElementById("added-img-anim").classList.add("play-anim");
    setTimeout(() => {
      document.getElementById("added-img-anim").classList.remove("play-anim");
    }, 1100);
    document.getElementById("img-input").value = "";
    document.getElementById("img-submit").disabled = true;
  };

  return (
    <div className="user-sign-form">
      <form onSubmit={(e) => onSubmit(e)}>
        <input id="img-input" type="file" onChange={(e) => onChange(e)} />
        <input type="text" name="title" placeholder="add a title" />
        <button id="img-submit" type="submit">
          submit
        </button>
      </form>
      <h1 id="added-img-anim">image added</h1>
    </div>
  );
};