import React from "react";

const ResizedImage = ({ image, resolution }) => {
  return (
    <div>
      <h3>
        Resized Image ({resolution}x{resolution})
      </h3>
      <img src={image} alt="Resized" />
    </div>
  );
};

export default ResizedImage;
