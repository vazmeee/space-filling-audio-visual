import React from "react";

const BitDepthSelector = ({ bitDepth, onChange }) => {
  return (
    <div>
      <label htmlFor="bitDepth">Select Bit Depth:</label>
      <select
        id="bitDepth"
        value={bitDepth}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      >
        {[1, 2, 3, 4, 5, 6].map((bit) => (
          <option key={bit} value={bit}>
            {bit} Bit
          </option>
        ))}
      </select>
    </div>
  );
};

export default BitDepthSelector;
