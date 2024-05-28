import React from "react";
import { hilbertCurve } from "./hilbertCurve";

export const quantizeImage = (imageData, bitDepth) => {
  const factor = 255 / (Math.pow(2, bitDepth) - 1);
  for (let i = 0; i < imageData.length; i += 4) {
    const avg = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
    const quantizedValue = Math.round(avg / factor) * factor;
    imageData[i] = quantizedValue; // Red
    imageData[i + 1] = quantizedValue; // Green
    imageData[i + 2] = quantizedValue; // Blue
    // Alpha remains the same
  }
  return imageData;
};

export const resizeImage = (img, width, height) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL();
};

export const animateLinearCNN = (canvas, imageData, width, height) => {
  const ctx = canvas.getContext("2d");
  const data = imageData.data;
  const linearImageData = ctx.createImageData(width, height);

  let i = 0;
  const interval = setInterval(() => {
    if (i < data.length) {
      linearImageData.data[i] = data[i];
      linearImageData.data[i + 1] = data[i + 1];
      linearImageData.data[i + 2] = data[i + 2];
      linearImageData.data[i + 3] = data[i + 3];
      ctx.putImageData(linearImageData, 0, 0);
      i += 4;
    } else {
      clearInterval(interval);
    }
  }, 1); // Adjust the speed of the animation here
};

export const animateHilbertCurve = (canvas, imageData, width, height) => {
  const ctx = canvas.getContext("2d");
  const data = imageData.data;
  const hilbertPoints = hilbertCurve(width);
  const hilbertImageData = ctx.createImageData(width, height);

  let i = 0;
  const interval = setInterval(() => {
    if (i < hilbertPoints.length) {
      const point = hilbertPoints[i];
      const x = Math.floor(point.x);
      const y = Math.floor(point.y);
      const index = (y * width + x) * 4;
      hilbertImageData.data[index] = data[index];
      hilbertImageData.data[index + 1] = data[index + 1];
      hilbertImageData.data[index + 2] = data[index + 2];
      hilbertImageData.data[index + 3] = data[index + 3];
      ctx.putImageData(hilbertImageData, 0, 0);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 1); // Adjust the speed of the animation here
};
