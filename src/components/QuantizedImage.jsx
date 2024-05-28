import React from "react";

const QuantizedImage = ({ image, bitDepth, resolution }) => {
  return (
    <div>
      <h3>
        Quantized Image ({bitDepth} Bit, {resolution}x{resolution})
      </h3>
      <img src={image} alt="Quantized" />
    </div>
  );
};

export default QuantizedImage;
