import React, { useContext } from "react";
import { ProfileContext } from "ContextsFolder";
import { HandleDeleteImage } from "Backend";

export const SingleImage = (props) => {
  let { GetId } = props;
  const { user } = useContext(ProfileContext);

  const HandleDelete = (id) => {
    HandleDeleteImage(user, id);
    GetId(id);
  };

  return (
    <>
      <div className="single-img">
        <div className="img-header">
          <h3>{props.title}</h3>
          <p>{props.user}</p>
        </div>
        <img width="500px" src={props.image} alt="none" />
        <br />
        {props.user ? (
          <></>
        ) : (
          <button onClick={() => HandleDelete(props.id)}>delete</button>
        )}
      </div>
    </>
  );
};
