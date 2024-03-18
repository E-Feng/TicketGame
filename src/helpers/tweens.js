import { correctMapCoords } from './renderer';

let scene;
let gameState;
let displayList;

export const initTweenVars = (initScene) => {
  scene = initScene;
  gameState = initScene.gameState;
  displayList = initScene.sys.displayList;
};

export const drawTween = (params) => {
  const { name, payload } = params;
  let obj;
  let texture;
  let number = 1;

  if (name === 'faceUpCards') {
    obj = displayList.getByName(name).getAll()[payload];
    texture = gameState.faceUpCards.cards[payload].color;
  } else if (name === 'deck') {
    obj = displayList.getByName(name);
    texture = 'deck';
  } else if (name === 'destDeck') {
    obj = displayList.getByName(name);
    texture = 'dest';
    number = 3;
  }

  const cardDelay = 100;
  for (let i = 0; i < number; i++) {
    const cardTween = scene.add.image(obj.x, obj.y, texture);
    scene.tweens.add({
      targets: cardTween,
      x: 0,
      y: 200,
      duration: 750,
      delay: cardDelay * i,
      ease: 'Linear',
      onComplete: () => cardTween.destroy(),
    });
  }
};

export const buildTween = (route, color) => {
  const nTrains = route.length;
  const targetCoords = route.tracks[0].coords;

  const tWidth = 35;
  const tHeight = 18;

  const trainDelay = 100;
  for (let i = 0; i < nTrains; i++) {
    const targetCoord = correctMapCoords(targetCoords[i]);

    const trainTween = scene.add
      .rectangle(10, 200, tWidth, tHeight)
      .setFillStyle(color, 1)
      .setStrokeStyle(4, 0x000000);
    scene.tweens.add({
      targets: trainTween,
      x: targetCoord[0],
      y: targetCoord[1],
      duration: 1000,
      delay: trainDelay * i,
      ease: 'Linear',
      onComplete: () => trainTween.destroy(),
    });
  }
};
