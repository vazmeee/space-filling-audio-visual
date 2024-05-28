import React from "react";

const OriginalImage = ({ image }) => {
  return (
    <div>
      <h3>Original Image</h3>
      <img src={image} alt="Original" />
    </div>
  );
};

export default OriginalImage;
