import React, { useState, useContext, useEffect } from "react";
import { ProfileContext } from "ContextsFolder";
import { HandleAddImage, HandleUploadImage } from "Backend";

export const AddImage = (props) => {
  let { user } = useContext(ProfileContext);
  const [fileURL, setFileURL] = useState("");
  let { HandleAddedImage } = props;

  useEffect(() => {
    if (document.getElementById("img-input").value) {
      document.getElementById("img-submit").disabled = false;
    } else {
      document.getElementById("img-submit").disabled = true;
    }
  }, [fileURL]);

  const HandleChange = async (e) => {
    const file = e.target.files[0];
    setFileURL(await HandleUploadImage(file));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    HandleAddImage(user, fileURL, title);
    document.getElementById("added-img-anim").classList.add("play-anim");
    setTimeout(() => {
      document.getElementById("added-img-anim").classList.remove("play-anim");
      HandleAddedImage();
    }, 1100);
    document.getElementById("img-input").value = "";
    document.getElementById("img-submit").disabled = true;
  };

  return (
    <div className="user-sign-form">
      <h2>Upload a meme:</h2>
      <form onSubmit={(e) => HandleSubmit(e)}>
        <input id="img-input" type="file" onChange={(e) => HandleChange(e)} />
        <input type="text" name="title" placeholder="add a title" />
        <button id="img-submit" type="submit">
          submit
        </button>
      </form>
      <h1 id="added-img-anim">image added</h1>
    </div>
  );
};
