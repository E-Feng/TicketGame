import { setRectangleProps, getTrainCoords } from '../utils/funcs';

const mapScale = 0.8;

export const initRender = (gameState) => {
  gameState.faceUpCards.render();
  gameState.board.render();
};

export const renderCard = () => {};

export const renderFaceUpCards = (objs) => {
  const x = 1850;
  const y = 50;

  objs.forEach((o, i) => {
    const color = o.getData('color');

    o.setPosition(x, i * 50 + y);
    o.setTexture(color);
  });
};

const colorMap = {
  red: 0xff0000,
  blue: 0x0000ff,
  green: 0x00ff00,
  pink: 0xffc0cb,
  white: 0xffffff,
  black: 0x36454f,
  grey: 0x808080,
  yellow: 0xffff00,
  orange: 0xffa500,
};
const boardCoords = {
  ATLANTA: [1520, 787],
  BOSTON: [1857, 205],
  CALGARY: [403, 97],
  CHARLESTON: [1708, 801],
  CHICAGO: [1322, 475],

  DALLAS: [1058, 988],
  DENVER: [721, 673],
  DULUTH: [1078, 351],
  ELPASO: [696, 1035],
  HELENA: [603, 361],

  HOUSTON: [1139, 1066],
  KS: [1058, 638],
  LV: [348, 830],
  LITTLEROCK: [1199, 819],
  LA: [218, 947],

  MIAMI: [1773, 1116],
  MONTREAL: [1717, 87],
  NASHVILLE: [1418, 716],
  NO: [1327, 1042],
  NY: [1753, 355],

  OKC: [1018, 812],
  OMAHA: [1015, 536],
  PHX: [458, 960],
  PITTSBURGH: [1583, 445],
  PORTLAND: [93, 343],

  RALEIGH: [1652, 670],
  STL: [1231, 641],
  SLC: [461, 609],
  SF: [64, 737],
  SANTAFE: [707, 854],
  SSM: [1332, 218],

  SEATTLE: [134, 234],
  TORONTO: [1550, 262],
  VANCOUVER: [141, 131],
  WASHINGTON: [1769, 535],
  WINNIPEG: [852, 120],
};
Object.keys(boardCoords).forEach((k) => {
  boardCoords[k] = boardCoords[k].map((v) => Math.round(v * mapScale));
});

const tWidth = 20;
const tHeight = 10;

export const renderBoard = (scene, objs) => {
  console.log('rendering');
  const bg = scene.add.image(0, 0, 'map').setScale(mapScale).setOrigin(0);
  bg.setDepth(-1);

  objs.forEach((o, i) => {
    const data = o.getData('data');
    const [city1, city2] = data.cities;
    const pos1 = boardCoords[city1];
    const pos2 = boardCoords[city2];
    const nTrains = data.number;

    setRectangleProps(o, pos1, pos2);

    const { trainAngle, trainCoords } = getTrainCoords(pos1, pos2, nTrains);
    if (data.owner[0]) {
      trainCoords.forEach((t) => {
        const r = scene.add.rectangle(t[0], t[1], tWidth, tHeight);
        r.setFillStyle(colorMap['blue'], 1);
        r.setAngle(trainAngle);
      });
    }
  });

  // objs.forEach((o, i) => {
  //   const data = o.getData('data');
  //   const nTrains = data.number;
  //   const color = data.tracks[0];
  //   const [city1, city2] = data.cities;

  //   const c1 = boardCoords[city1];
  //   const c2 = boardCoords[city2];

  //   const { trainAngle, trainCoords } = getTrainCoords(c1, c2, nTrains);

  //   scene.add.text(c1[0], c1[1], city1);
  //   scene.add.text(c2[0], c2[1], city2);

  //   trainCoords.forEach((t) => {
  //     const r = scene.add.rectangle(t[0], t[1], tWidth, tHeight);
  //     r.setFillStyle(colorMap[color], 1);
  //     r.setAngle(trainAngle);
  //   });
  // });
};
