import React, { useState, useContext, useEffect } from "react";
import { AddImage } from "ProfileComponents";
import { ProfileContext } from "ContextsFolder";
import { SingleImage } from "ImageComponents";
import { GetUserImages } from "Backend";

export const ProfileDetails = () => {
  const { user, HandleUser } = useContext(ProfileContext);
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    const func = async () => {
      setUserImages(await GetUserImages(user));
    };
    func();
  }, [user]);

  const handleLogout = () => {
    sessionStorage.setItem("user", "");
    HandleUser("");
  };

  return (
    <>
      <ProfileContext.Consumer>
        {({ user }) => (
          <>
            <h1>signed in as {user}</h1>
            <button onClick={() => handleLogout()}>logout</button>
            <h2>upload an image</h2>
            <AddImage />
          </>
        )}
      </ProfileContext.Consumer>
      <h2>your images below:</h2>
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
