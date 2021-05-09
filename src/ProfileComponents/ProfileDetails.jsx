import React, { useState, useContext, useEffect } from "react";
import { AddImage } from "ProfileComponents";
import { ProfileContext } from "ContextsFolder";
import { SingleImage } from "ImageComponents";
import { GetUserImages } from "Backend";

export const ProfileDetails = () => {
  const { user, HandleUser } = useContext(ProfileContext);
  const [userImages, setUserImages] = useState([]);
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

  return (
    <>
      <ProfileContext.Consumer>
        {({ user }) => (
          <>
            <h1>signed in as {user}</h1>
            <button onClick={() => HandleLogout()}>logout</button>
            <AddImage HandleAddedImage={HandleAddedImage} />
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
