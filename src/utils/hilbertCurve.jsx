export const hilbertCurve = (n) => {
  let points = [];
  const hilbert = (x, y, xi, xj, yi, yj, n) => {
    if (n <= 0) {
      points.push({ x: x + (xi + yi) / 2, y: y + (xj + yj) / 2 });
    } else {
      hilbert(x, y, yi / 2, yj / 2, xi / 2, xj / 2, n - 1);
      hilbert(x + xi / 2, y + xj / 2, xi / 2, xj / 2, yi / 2, yj / 2, n - 1);
      hilbert(
        x + xi / 2 + yi / 2,
        y + xj / 2 + yj / 2,
        xi / 2,
        xj / 2,
        yi / 2,
        yj / 2,
        n - 1,
      );
      hilbert(
        x + xi / 2 + yi,
        y + xj / 2 + yj,
        -yi / 2,
        -yj / 2,
        -xi / 2,
        -xj / 2,
        n - 1,
      );
    }
  };
  hilbert(0, 0, n, 0, 0, n, n);
  return points;
};
