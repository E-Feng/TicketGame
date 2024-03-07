export const shuffleArray = (array, inputSeed) => {
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(inputSeed) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];

    inputSeed++;
  }
};

export const setRectangleProps = (o, c1, c2) => {
  const [x1, y1, x2, y2] = [...c1, ...c2];

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  o.setPosition(midX, midY);
  o.setSize(dist, 40);
  o.setAngle(angle);
  o.setStrokeStyle(5, 0xff0000, 1);
};

export const getTrainCoords = (c1, c2, n) => {
  const [x1, y1] = c1;
  const [x2, y2] = c2;

  const coords = [];
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  const xs = (x2 - x1) / (n + 1);
  const ys = (y2 - y1) / (n + 1);

  for (let i = 0; i < n; i++) {
    const x = x1 + xs * (i + 1);
    const y = y1 + ys * (i + 1);
    coords.push([x, y]);
  }

  return {
    trainAngle: angle,
    trainCoords: coords,
  };
};
