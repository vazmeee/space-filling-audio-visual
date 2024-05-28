import React from "react";

const ResolutionSelector = ({ resolution, onChange }) => {
  return (
    <div>
      <label htmlFor="resolution">Select Resolution:</label>
      <select
        id="resolution"
        value={resolution}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      >
        {[8, 16, 32, 64, 128, 256, 512].map((res) => (
          <option key={res} value={res}>
            {res}x{res}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResolutionSelector;
