import React from "react";

const LinearCNNImage = ({ image, resolution }) => {
  return (
    <div>
      <h3>
        Linear CNN-like Reconstructed Image ({resolution}x{resolution})
      </h3>
      <img src={image} alt="Linear CNN" />
    </div>
  );
};

export default LinearCNNImage;
