import { CITIES } from './boardConsts';
import {
  calculateTrainAngle,
  setRectangleProps,
  addArrays,
} from '../utils/funcs';

const localPlayerId = localStorage.getItem('uid');

let scene;
let gameState;

export const playerColorMap = {
  red: 0xff0000,
  blue: 0x0096ff,
  green: 0x00ff00,
  yellow: 0xffff00,
  orange: 0xffa500,
};

const colorMap = {
  red: 0xff0000,
  blue: 0x0096ff,
  green: 0x00ff00,
  black: 0x36454f,
  // grey: 0x808080,
  yellow: 0xffff00,
  orange: 0xffa500,
  pink: 0xffc0cb,
  white: 0xffffff,
};

const flagColors = Object.values(colorMap);

export const initRenderVars = (initScene) => {
  scene = initScene;
  gameState = scene.gameState;
};

export const initRender = () => {
  scene.gameState.faceUpCards.render();
  scene.gameState.board.render();
  scene.gameState.deck.render();
  scene.gameState.destDeck.render();
  scene.gameState.players.forEach((p) => p.render());
  renderCurrentTurnMessage();
};

const mapScale = 0.7;
const mapWidth = 1894 * mapScale;
const mapHeight = 1212 * mapScale;

export const width = 1600;
export const height = 1080;

const playerCardWidth = 120;
const playerCardHeight = 160;

export const renderPlayerCard = (objGroup) => {
  // console.log(scene.sys.displayList, gameState);
  const scoreX = 0;
  const scoreY = 0;

  const offset = objGroup.order * playerCardHeight;

  const id = objGroup.id;
  const indWidth = id === localPlayerId ? 5 : 0;

  objGroup.bg
    .setPosition(scoreX, scoreY + offset)
    .setOrigin(0)
    .setSize(playerCardWidth, playerCardHeight)
    .setDepth(-1)
    .setStrokeStyle(indWidth, 0x000000, 1);
  objGroup.display
    .setPosition(scoreX, scoreY + offset)
    .setFill('white')
    .setFontSize(36);
  objGroup.points
    .setPosition(scoreX, scoreY + offset + 30)
    .setFill('white')
    .setFontSize(36);
  objGroup.trainsLeft.setPosition(scoreX, scoreY + 60 + offset).setFontSize(36);
  objGroup.handSize.setPosition(scoreX, scoreY + 90 + offset).setFontSize(36);
  objGroup.numDestCards
    .setPosition(scoreX, scoreY + 120 + offset)
    .setFontSize(36);
};

const mapX = playerCardWidth;
const mapY = 0;

const cardsX = mapX + mapWidth + 75;

const handX = 50;
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
  obj.setVisible(true);
};

const cardOverlap = 40;
export const renderHand = (hand) => {
  hand.forEach((card, i) => {
    const obj = card.obj;

    obj.setPosition(handX + i * cardOverlap);
    obj.setDepth(i);

    renderCard(card);
  });
};

const destX = 200;
const destY = 975;
export const renderDestCards = () => {
  const player = gameState.getPlayer(localPlayerId);

  const destCards = player.destCards;
  const pendingDestCards = player.pendingDestCards;

  destCards.forEach((card, i) => {
    const offset = i * 100;
    const fillColor = flagColors[i]
    renderDestCard(card, offset, fillColor);
  });
  pendingDestCards.forEach((card, i) => {
    const offset = i * 100 + 500;
    const fillColor = flagColors[i + destCards.length]
    renderDestCard(card, offset, fillColor);
  });
};

export const renderDestCard = (card, offset, fillColor) => {
  const objGroup = card.objGroup;
  const strokeColor = card.selected ? 0x00ff00 : 0xff5733;

  objGroup.card
    .setPosition(destX + offset, destY)
    .setSize(60, 90)
    .setOrigin(0)
    .setFillStyle(fillColor, 0.4)
    .setStrokeStyle(4, strokeColor)
    .setVisible(true);
  objGroup.cities
    .setPosition(destX + offset, destY)
    .setFontSize(30)
    .setFill('black')
    .setVisible(true);
  objGroup.points
    .setPosition(destX + offset, destY + 60)
    .setFontSize(30)
    .setFill('black')
    .setVisible(true);
};

export const renderIndicator = (obj) => {
  obj
    .setVisible(true)
    .setOrigin(0)
    .setPosition(0, 0)
    .setSize(width, height)
    .setDepth(-5);
};

export const renderDeck = (objs) => {
  const deck = objs.deck;
  deck.setTexture('deck');
  deck.setPosition(cardsX, 600);

  const counter = objs.counter;
  counter
    .setPosition(cardsX + 30, 600 + 10)
    .setFill('black')
    .setFontSize(24)
    .setDepth(5);
};

export const renderDestDeck = (destDeck) => {
  const obj = destDeck.obj;
  obj.setTexture('dest');
  obj.setPosition(cardsX, 750);
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

export const CITIES_ADJ = CITIES.map((city) => {
  const coordsScaled = city.coords.map((c) => c * mapScale);
  const coordsAdj = addArrays(coordsScaled, [mapX, mapY]);

  return {
    ...city,
    coords: coordsAdj,
  };
});

const tWidth = 35;
const tHeight = 18;

export const renderBoard = () => {
  const routeObjs = gameState.board.routes;

  const bg = scene.add.image(mapX, mapY, 'map').setScale(mapScale).setOrigin(0);
  bg.setDepth(-1);

  routeObjs.forEach((r) => {
    const o = r.obj;
    o.setVisible(true);

    const data = r;
    const [city1, city2] = data.cities;
    const pos1 = CITIES_ADJ.filter((c) => c.id === city1)[0].coords;
    const pos2 = CITIES_ADJ.filter((c) => c.id === city2)[0].coords;

    setRectangleProps(o, pos1, pos2);

    data.tracks.forEach((track) => {
      const ownerId = track.owner;
      const trainCoords = track.coords;

      if (ownerId) {
        const player = gameState.getPlayer(ownerId);
        const trainAngles = calculateTrainAngle(r);

        trainCoords.forEach((t, i) => {
          const tS = [t[0] * mapScale + mapX, t[1] * mapScale + mapY];
          const r = scene.add
            .rectangle(tS[0], tS[1], tWidth, tHeight)
            .setFillStyle(player.color, 1)
            .setStrokeStyle(4, 0x000000)
            .setAngle(trainAngles[i]);
        });
      }
    });
  });

  const rad = 75;
  const player = gameState.getPlayer(localPlayerId);
  const destCards = player.destCards;

  const oldObjs = scene.sys.displayList.getAll('name', 'ellipse');
  if (oldObjs) oldObjs.forEach((o) => o.destroy());

  const allDestCards = destCards.concat(player.pendingDestCards);

  allDestCards.forEach((destCard, i) => {
    const color = flagColors[i];

    const [city1, city2] = destCard.cities;
    const pos1 = CITIES_ADJ.filter((c) => c.id === city1)[0].coords;
    const pos2 = CITIES_ADJ.filter((c) => c.id === city2)[0].coords;

    scene.add
      .ellipse(pos1[0], pos1[1], rad, rad)
      .setFillStyle(color, 0.4)
      .setName('ellipse');
    scene.add
      .ellipse(pos2[0], pos2[1], rad, rad)
      .setFillStyle(color, 0.4)
      .setName('ellipse');
  });
};

export const renderCurrentTurnMessage = () => {
  const objList = scene.sys.displayList;

  const obj = objList.getByName('currentTurnMessage');
  if (!obj) {
    scene.add
      .text()
      .setVisible(false)
      .setName('currentTurnMessage')
      .setPosition(800, 20)
      .setFontSize(48)
      .setFill('black')
      .setBackgroundColor('gray');
  } else {
    const playerId = scene.gameState.getCurrentTurnId();

    const text = 'Your turn';
    if (localPlayerId === playerId) {
      obj.setVisible(true).setText(text);
    } else {
      obj.setVisible(false);
    }
  }
};

export const renderConfirmButton = (button) => {
  const obj = button.obj;

  const player = gameState.getPlayer(localPlayerId);
  const isVisible = player.hasPendingDestCards();

  obj
    .setPosition(1400, 1000)
    .setText('Confirm')
    .setFill('black')
    .setFontSize(40)
    .setVisible(isVisible);
};
