import { getEndGameDestPos } from './renderer';

const localPlayerId = localStorage.getItem('uid');

let scene;
let gameState;
let displayList;

export const initTweenVars = (initScene) => {
  scene = initScene;
  gameState = initScene.gameState;
  displayList = initScene.sys.displayList;
};

export const drawTween = (params) => {
  const { name, playerId, payload } = params;
  let obj;
  let texture;
  let number = 1;

  const container = displayList.getByName(playerId);
  const xTarget = container.x;
  const yTarget = container.y + container.height / 2;

  if (name === 'faceUpCards') {
    obj = displayList.getByName(name).getAll()[payload];
    texture = gameState.faceUpCards.cards[payload].color;
  } else if (name === 'deck') {
    obj = displayList.getByName(name);
    texture = 'deck';
  } else if (name === 'destDeck') {
    obj = displayList.getByName(name);
    texture = 'destDeck';
    number = 3;
  }

  const cardDelay = 75;
  for (let i = 0; i < number; i++) {
    const cardTween = scene.add.image(obj.x, obj.y, texture).setOrigin(0, 0);
    scene.tweens.add({
      targets: cardTween,
      x: xTarget,
      y: yTarget,
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

  const container = displayList.getByName(localPlayerId);
  const xSource = container.x;
  const ySource = container.y + container.height / 2;

  const tWidth = 35;
  const tHeight = 18;

  const trainDelay = 100;
  for (let i = 0; i < nTrains; i++) {
    const targetCoord = targetCoords[i];

    const trainTween = scene.add
      .rectangle(xSource, ySource, tWidth, tHeight)
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

export const buildDiscardTween = (cards) => {
  const container = displayList.getByName(localPlayerId);
  const xSource = container.x;
  const ySource = container.y + container.height / 2;

  const deckContainer = displayList.getByName('deck');
  const xTarget = deckContainer.x;
  const yTarget = deckContainer.y;

  const cardDelay = 75;

  cards.forEach((card, i) => {
    const cardTween = scene.add.image(xSource, ySource, card).setOrigin(0, 0);
    scene.tweens.add({
      targets: cardTween,
      x: xTarget,
      y: yTarget,
      duration: 750,
      delay: cardDelay * i,
      ease: 'Linear',
      onComplete: () => cardTween.destroy(),
    });
  });
};

export const currentTurnEmojiTween = () => {
  const emoji = displayList.getByName('currentTurnEmoji');

  const currentPlayerId = gameState.getCurrentTurnId();
  const container = displayList.getByName(currentPlayerId);
  const x = container.x + container.width / 1.2;
  const y = container.y + container.height / 2.5;

  scene.tweens.add({
    targets: emoji,
    x: x,
    y: y,
    duration: 500,
    ease: 'Linear',
  });
};

export const finalTurnTween = () => {
  console.log('firing final turn tween');
  const text = displayList.getByName('currentTurnMessage').setScale(5);

  scene.tweens.add({
    targets: text,
    scaleX: 1,
    scaleY: 1,
    ease: 'Linear',
    duration: 3000,
  });
};

export const endGameTween = () => {
  console.log('starting end game');
  const players = gameState.players;

  const cardsContainer = displayList.getByName('cards');
  cardsContainer.getAll().forEach((card) => card.setVisible(false));

  const destCardsContainer = displayList.getByName('destCards');
  destCardsContainer.getAll().forEach((destCard) => destCard.setVisible(false));

  const destPos = getEndGameDestPos();
  let iDestPos = 0;

  players.forEach((p) => {
    const destCards = p.destCards;

    destCards.forEach((destCard) => {
      const pos = destPos[iDestPos];
      const emoji = destCard.isCompleted ? '✔️' : '❌';

      const destCardObj = destCardsContainer.getByName(destCard.id);
      destCardObj.setVisible(true).setPosition(pos[0], pos[1]);
      destCardObj.getByName('checkmark').setText(emoji).setVisible(true);

      iDestPos += 1;
    });
  });
};
