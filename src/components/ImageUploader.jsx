import React, { useState, useEffect } from "react";
import BitDepthSelector from "./BitDepthSelector";
import ResolutionSelector from "./ResolutionSelector";
import OriginalImage from "./OriginalImage";
import ResizedImage from "./ResizedImage";
import QuantizedImage from "./QuantizedImage";
import LinearCNNImage from "./LinearCNNImage";
import {
  quantizeImage,
  resizeImage,
  animateLinearCNN,
  animateHilbertCurve,
} from "../utils/imageUtils";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [defaultImage] = useState("https://via.placeholder.com/150"); // Replace with your default image URL
  const [bitDepth, setBitDepth] = useState(1);
  const [resolution, setResolution] = useState(128); // Default resolution
  const [quantizedImage, setQuantizedImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError(null);
      };
      reader.onerror = () => {
        setError("Failed to read file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        try {
          // Resize the image
          const resizedDataURL = resizeImage(img, resolution, resolution);
          setResizedImage(resizedDataURL);

          // Quantize the resized image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = resolution;
          canvas.height = resolution;
          ctx.drawImage(img, 0, 0, resolution, resolution);
          const imageData = ctx.getImageData(0, 0, resolution, resolution);
          const data = imageData.data;

          const quantizedData = quantizeImage([...data], bitDepth);
          for (let i = 0; i < data.length; i++) {
            data[i] = quantizedData[i];
          }
          ctx.putImageData(imageData, 0, 0);
          setQuantizedImage(canvas.toDataURL());

          // Animate Linear CNN-like reconstruction
          const linearCNNCanvas = document.createElement("canvas");
          linearCNNCanvas.width = resolution;
          linearCNNCanvas.height = resolution;
          document
            .getElementById("linear-cnn-container")
            .appendChild(linearCNNCanvas);
          animateLinearCNN(linearCNNCanvas, imageData, resolution, resolution);

          // Animate Hilbert curve reconstruction
          const hilbertCanvas = document.createElement("canvas");
          hilbertCanvas.width = resolution;
          hilbertCanvas.height = resolution;
          document
            .getElementById("hilbert-container")
            .appendChild(hilbertCanvas);
          animateHilbertCurve(hilbertCanvas, imageData, resolution, resolution);
        } catch (error) {
          setError(
            "An error occurred while processing the image. Please try again.",
          );
        }
      };
      img.onerror = () => {
        setError("Failed to load the image. Please try again.");
      };
    }
  }, [image, bitDepth, resolution]);

  return (
    <div className="image-uploader">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {error && <p className="error">{error}</p>}
      <BitDepthSelector bitDepth={bitDepth} onChange={setBitDepth} />
      <ResolutionSelector resolution={resolution} onChange={setResolution} />
      <OriginalImage image={image || defaultImage} />
      {resizedImage && (
        <ResizedImage image={resizedImage} resolution={resolution} />
      )}
      {quantizedImage && (
        <QuantizedImage
          image={quantizedImage}
          bitDepth={bitDepth}
          resolution={resolution}
        />
      )}
      <div id="linear-cnn-container"></div>
      <div id="hilbert-container"></div>
    </div>
  );
};

export default ImageUploader;
