import { boardCoords } from '../helpers/renderer';

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
  // o.setStrokeStyle(5, 0xff0000, 1);
};

export const getTrainCoords = (c1, c2, n, pos) => {
  let [x1, y1] = c1;
  let [x2, y2] = c2;

  const offset = pos === 1 ? 0 : (pos - 2.5) * 10;
  x1 += offset;
  x2 += offset;
  y1 += offset;
  y2 += offset;

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

const getAngleTwoPoints = (p1, p2) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
};

const getArrayAvg = (arr) => {
  return arr.reduce((a, b) => a + b) / arr.length;
};

export const calculateTrainAngle = (route) => {
  console.log(route);
  const length = route.getRouteLength();
  const coords = route.tracks[0].coords;

  const trainAngles = [];

  if (length === 1) {
    const [c1, c2] = route.cities;
    const point1 = boardCoords[c1].coords;
    const point2 = boardCoords[c2].coords;
    const angle = getAngleTwoPoints(point1, point2);
    trainAngles.push(angle);
  } else {
    coords.forEach((c, i) => {
      const tempAngles = [];

      const before = coords[i - 1];
      const after = coords[i + 1];

      const a1 = before ? getAngleTwoPoints(before, c) : null;
      const a2 = after ? getAngleTwoPoints(c, after) : null;

      if (a1) tempAngles.push(a1);
      if (a2) tempAngles.push(a2);
      console.log(tempAngles)
      const angle = getArrayAvg(tempAngles);
      trainAngles.push(angle);
    });
  }
  console.log(trainAngles)
  return trainAngles;
};
