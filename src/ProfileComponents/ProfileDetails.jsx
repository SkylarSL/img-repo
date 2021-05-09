import React, { useState, useContext, useEffect } from "react";
import { AddImage } from "ProfileComponents";
import { ProfileContext } from "ContextsFolder";
import { SingleImage } from "ImageComponents";
import { GetUserImages, HandleSearchImage } from "Backend";

export const ProfileDetails = () => {
  const { user, HandleUser } = useContext(ProfileContext);
  const [userImages, setUserImages] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [addedImage, setAddedImage] = useState(0);

  useEffect(() => {
    const func = async () => {
      setUserImages(await GetUserImages(user));
    };
    func();
    setAddedImage(0);
  }, [user, addedImage]);

  const HandleAddedImage = () => {
    setAddedImage(1);
  };

  const HandleLogout = () => {
    sessionStorage.setItem("user", "");
    HandleUser("");
  };

  const HandleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const HandleSearch = async (e) => {
    e.preventDefault();
    const searchedImgs = await HandleSearchImage(user, search);
    if (searchedImgs.length === 0) {
      setMessage("no images found");
    } else {
      setMessage("");
    }
    setUserImages(searchedImgs);
  };

  const HandleRefresh = async (e) => {
    e.preventDefault();
    setUserImages(await GetUserImages(user));
    document.getElementById("search-bar").value = "";
  };

  return (
    <>
      <ProfileContext.Consumer>
        {({ user }) => <h1>Signed in as {user}</h1>}
      </ProfileContext.Consumer>
      <button onClick={() => HandleLogout()}>logout</button>
      <AddImage HandleAddedImage={HandleAddedImage} />
      <h2>Your memes:</h2>
      <input
        id="search-bar"
        type="text"
        name="search"
        placeholder="search"
        onChange={(e) => HandleSearchChange(e)}
      />
      <div className="search-buttons">
        <button onClick={(e) => HandleSearch(e)}>submit</button>
        <button onClick={(e) => HandleRefresh(e)}>refresh</button>
      </div>
      <p>{message}</p>
      {userImages && userImages.length > 0 ? (
        userImages.map((image) => (
          <SingleImage
            key={image.id}
            id={image.id}
            image={image.image}
            title={image.title}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};
