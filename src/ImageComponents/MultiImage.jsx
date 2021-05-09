import React, { useEffect, useState } from "react";
import { SingleImage } from "ImageComponents";
import { GetAllImages } from "Backend";

export const MultiImage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const func = async () => {
      setImages(await GetAllImages());
    };
    func();
  }, []);

  if (images && images.length > 0) {
    return (
      <>
        {images.map((image, index) => (
          <SingleImage
            key={index}
            id={image.id}
            user={image.user}
            image={image.image}
            title={image.title}
          />
        ))}
      </>
    );
  } else if (images && images.length === 0) {
    return <h1>no images</h1>;
  } else {
    return <h1>loading images...</h1>;
  }
};
