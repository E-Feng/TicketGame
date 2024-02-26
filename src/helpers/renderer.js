import { setRectangleProps, getTrainCoords } from '../utils/funcs';

const mapScale = 0.7;

export const width = 1600;
export const height = 1080;

const mapWidth = 1894 * mapScale;
const mapHeight = 1212 * mapScale;

const cardsX = mapWidth + 100;

export const initRender = (gameState) => {
  gameState.faceUpCards.render();
  gameState.board.render();
  gameState.deck.render();
};

const handX = 400;
const handY = 900;

const selectedOffset = 20;

export const renderCard = (card) => {
  const obj = card.obj;
  const color = card.color;
  const selected = card.selected;

  const x = obj.x;
  const y = selected ? handY - selectedOffset : handY;

  obj.setPosition(x, y);
  obj.setTexture(color);
  obj.setActive(true);
};

export const renderHand = (hand) => {
  hand.forEach((card, i) => {
    const obj = card.obj;

    obj.setPosition(handX + i * 50);
    obj.setDepth(i);

    renderCard(card);
  });
};

export const renderDeck = (deck) => {
  const obj = deck.obj;
  obj.setTexture('deck');
  obj.setPosition(cardsX, 700);
};

export const renderFaceUpCards = (objs) => {
  const x = cardsX;
  const y = 50;

  objs.forEach((o, i) => {
    const color = o.getData('color');

    o.setPosition(x, i * 100 + y);
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
  ATL: { coords: [1520, 787] },
  BOS: { coords: [1857, 205] },
  CAL: { coords: [403, 97] },
  CHA: { coords: [1708, 801] },
  CHI: { coords: [1322, 475] },
  DAL: { coords: [1058, 988] },
  DEN: { coords: [721, 673] },
  DUL: { coords: [1078, 351] },
  EP: { coords: [696, 1035] },
  HEL: { coords: [603, 361] },
  HOU: { coords: [1139, 1066] },
  KS: { coords: [1058, 638] },
  LV: { coords: [348, 830] },
  LR: { coords: [1199, 819] },
  LA: { coords: [218, 947] },
  MIA: { coords: [1773, 1116] },
  MON: { coords: [1717, 87] },
  NAS: { coords: [1418, 716] },
  NO: { coords: [1327, 1042] },
  NY: { coords: [1753, 355] },
  OKC: { coords: [1018, 812] },
  OMA: { coords: [1015, 536] },
  PHX: { coords: [458, 960] },
  PIT: { coords: [1583, 445] },
  POR: { coords: [93, 343] },
  RAL: { coords: [1652, 670] },
  STL: { coords: [1231, 641] },
  SLC: { coords: [461, 609] },
  SF: { coords: [64, 737] },
  SFE: { coords: [707, 854] },
  SSM: { coords: [1332, 218] },
  SEA: { coords: [134, 234] },
  TOR: { coords: [1550, 262] },
  VAN: { coords: [141, 131] },
  WAS: { coords: [1769, 535] },
  WIN: { coords: [852, 120] },
};
Object.keys(boardCoords).forEach((k) => {
  boardCoords[k].coords = boardCoords[k].coords.map((v) => Math.round(v * mapScale));
});

const tWidth = 20;
const tHeight = 10;

export const renderBoard = (scene, objs) => {
  console.log('rendering');
  const bg = scene.add.image(0, 0, 'map').setScale(mapScale).setOrigin(0);
  bg.setDepth(-1);

  objs.forEach((r, i) => {
    const o = r.obj;

    const data = r;
    const [city1, city2] = data.cities;
    const pos1 = boardCoords[city1].coords;
    const pos2 = boardCoords[city2].coords;
    const nTrains = data.number;

    setRectangleProps(o, pos1, pos2);

    const { trainAngle, trainCoords } = getTrainCoords(pos1, pos2, nTrains);

    if (data.tracks[0].owner) {
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
