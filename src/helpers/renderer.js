import { CITIES, mapX, mapY, mapScale } from './boardConsts';
import { calculateTrainAngle, getRouteProps } from '../utils/funcs';
import { destColorMap } from './colors';

const localPlayerId = localStorage.getItem('uid');

let scene;
let gameState;
let displayList;

export const initRenderVars = (initScene) => {
  scene = initScene;
  gameState = initScene.gameState;
  displayList = scene.sys.displayList;
};

export const width = 1600;
export const height = 1080;

const mapWidth = 1894 * mapScale;
const mapHeight = 1212 * mapScale;

const playerCardWidth = mapX;
const playerCardHeight = 180;

export const initRenderObject = (objName) => {
  const gameStateObj = gameState[objName];

  switch (objName) {
    case 'playerCards':
      gameState.players.forEach((p, i) => {
        const [x, y] = [0, i * playerCardHeight];
        const c = scene.add
          .container()
          .setName(p.id)
          .setPosition(x, y)
          .setSize(playerCardWidth, playerCardHeight);
        c.add(
          scene.add
            .rectangle()
            .setOrigin(0)
            .setSize(playerCardWidth, playerCardHeight)
            .setFillStyle(p.color, 0.35)
        );
        c.add(
          scene.add
            .text(10, 5, p.display)
            .setName('display')
            .setFill('black')
            .setFontSize(36)
        );
        c.add(
          scene.add
            .text(55, 57)
            .setName('points')
            .setFill('black')
            .setFontSize(50)
            .setFontStyle('bold')
            .setOrigin(0.5)
        );
        c.add(
          scene.add
            .text(10, 80)
            .setName('trainsLeft')
            .setFill('black')
            .setFontSize(30)
        );
        c.add(
          scene.add
            .text(10, 110, '', { testString: '✈️' })
            .setName('numDestCards')
            .setFill('black')
            .setFontSize(30)
        );
        c.add(
          scene.add
            .text(18, 145, '', { testString: '🃏' })
            .setName('handSize')
            .setFill('black')
            .setFontSize(30)
        );
      });
      break;
  }
  gameStateObj?.initObjs();
};

export const initRender = () => {
  const objs = ['playerCards'];

  objs.forEach((o) => initRenderObject(o));

  scene.gameState.faceUpCards.render();
  scene.gameState.board.render();
  scene.gameState.deck.render();
  scene.gameState.destDeck.render();
  scene.gameState.players.forEach((p) => p.render());
};

export const renderPlayerCard = (player) => {
  const container = displayList.getByName(player.id);
  container.getByName('points').setText(player.points);
  container.getByName('trainsLeft').setText(`🚂${player.trainsLeft}`);
  container.getByName('numDestCards').setText(`✈️${player.destCards.length}`);
  container.getByName('handSize').setText(`🃏${player.hand.length}`);
};

const trainCardHeight = 76;
const trainCardWidth = 140;

const cardsX = mapX + mapWidth + 7;
const cardsY = 160;
const cardsYDelta = trainCardHeight + 20;

const deckY = 640;
const countOffset = [100, 50];

const handX = mapX + trainCardHeight;
const handY = 810;

const selectedOffset = 20;

export const renderCard = (card) => {
  const container = displayList.getByName('cards');
  const obj = container.getByName(card.id);

  const selected = card.selected;

  const x = obj.x;
  const y = selected ? handY - selectedOffset : handY;

  obj.setPosition(x, y);
};

const cardOverlap = 40;
export const renderHand = (player) => {
  const container = displayList.getByName('cards');
  container.getAll().forEach((o) => o.setVisible(false));

  const hand = player.hand;

  hand.forEach((card, i) => {
    const obj = container.getByName(card.id);

    const x = handX + i * cardOverlap;
    const y = card.selected ? handY - selectedOffset : handY;

    container.bringToTop(obj);
    obj.setPosition(x, y).setVisible(true);
  });
};

export const renderDeck = () => {
  let container = displayList.getByName('deck');
  let cardsContainer = displayList.getByName('cards');

  if (!container) {
    const c = scene.add.container(cardsX, deckY).setName('deck');

    c.add(scene.add.image(0, 0, 'deck').setOrigin(0).setName('deck'));
    c.add(
      scene.add
        .text(countOffset[0], countOffset[1])
        .setName('counter')
        .setFill('black')
        .setFontSize(24)
        .setDepth(3)
    );
    gameState.deck.initObjs();

    container = displayList.getByName('deck');
  }

  if (!cardsContainer) {
    const c = scene.add.container().setName('cards');

    const allCards = [];
    allCards.push(...gameState.deck.cards);
    allCards.push(...gameState.faceUpCards.cards);
    gameState.players.forEach((p) => allCards.push(...p.hand));

    allCards.forEach((card) => {
      c.add(
        scene.add
          .image(0, 0, card.color)
          .setName(card.id)
          .setAngle(90)
          .setOrigin(0)
          .setVisible(false)
      );
      card.initObjs();
    });

    cardsContainer = displayList.getByName('cards');
  }

  const count = gameState.deck.cards.length;
  container.getByName('counter').setText(count);
};

const destDeckX = cardsX;
const destDeckY = 10;

const destCardX = mapX;
const destCardY = 960;
const destCardWidth = 80;
const destCardHeight = 100;

const indicatorRadius = 75;

const lineAlpha = 0.2;
const lineHoverAlpha = 0.7;

export const renderDestDeck = () => {
  let destDeckContainer = displayList.getByName('destDeck');
  let destCardsContainer = displayList.getByName('destCards');

  if (!destDeckContainer) {
    const c = scene.add.container(destDeckX, destDeckY).setName('destDeck');
    c.add(scene.add.image(0, 0, 'destDeck').setOrigin(0).setName('destDeck'));
    c.add(
      scene.add
        .text(countOffset[0], countOffset[1])
        .setName('counter')
        .setFill('black')
        .setFontSize(24)
        .setDepth(3)
    );
    gameState.destDeck.initObjs();

    destDeckContainer = displayList.getByName('destDeck');
  }

  if (!destCardsContainer) {
    const allDestCards = [];
    allDestCards.push(...gameState.destDeck.destCards);
    gameState.players.forEach((p) => allDestCards.push(...p.pendingDestCards));

    const c = scene.add.container().setName('destCards');

    allDestCards.forEach((destCard) => {
      const [city1, city2] = destCard.cities;
      const cityPos1 = CITIES.filter((c) => c.id === city1)[0].coords;
      const cityPos2 = CITIES.filter((c) => c.id === city2)[0].coords;

      const c2 = scene.add
        .container(destCardX, destCardY)
        .setName(destCard.id)
        .setVisible(false);
      c.add(c2);

      const card = scene.add
        .rectangle()
        .setName('card')
        .setOrigin(0)
        .setSize(destCardWidth, destCardHeight)
        .setStrokeStyle(4, 0xffffff);
      c2.add(card);

      c2.add(
        scene.add
          .text(10, 5, destCard.cities)
          .setName('cities')
          .setFill('black')
          .setFontSize(30)
      );
      c2.add(
        scene.add
          .text(10, 65, destCard.points)
          .setName('points')
          .setFill('black')
          .setFontSize(30)
      );
      c2.add(
        scene.add
          .text(35, 70, '✔️', { testString: '✔️' })
          .setName('checkmark')
          .setFontSize(44)
          .setDepth(5)
          .setVisible(false)
      );
      c2.add(
        scene.add
          .ellipse(0, 0, indicatorRadius, indicatorRadius)
          .setData('p', cityPos1)
          .setName('indicator1')
      );
      c2.add(
        scene.add
          .ellipse(0, 0, indicatorRadius, indicatorRadius)
          .setData('p', cityPos2)
          .setName('indicator2')
      );
      const line = scene.add
        .line(0, 0)
        .setData('points', cityPos1.concat(cityPos2))
        .setOrigin(0)
        .setLineWidth(20)
        .setName('line');
      c2.add(line);

      card
        .setInteractive()
        .on('pointerover', () => {
          line.setStrokeStyle(1, line.strokeColor, lineHoverAlpha);
        })
        .on('pointerout', () => {
          line.setStrokeStyle(1, line.strokeColor, lineAlpha);
        });

      destCard.initObjs();
    });

    destCardsContainer = displayList.getByName('destCards');
  }

  const count = gameState.destDeck.destCards.length;
  destDeckContainer.getByName('counter').setText(count);
};

const indicatorAlpha = 0.4;
const destCardOffset = destCardWidth + 15;

export const renderDestCards = (player) => {
  const deckContainer = displayList.getByName('destCards');
  deckContainer.getAll().forEach((o) => o.setVisible(false));

  const destCards = player.destCards;
  const pendingDestCards = player.pendingDestCards;

  const allCards = destCards.concat(pendingDestCards);

  allCards.forEach((card, i) => {
    const container = deckContainer.getByName(card.id);
    container.setDepth(i);

    const isSelected = card.isSelected;
    const isCompleted = card.isCompleted;
    const isPending = pendingDestCards.includes(card);
    const strokeColor = isSelected ? 0x00ff00 : 0xff5733;

    const baseOffset = i * destCardOffset;
    const pendingOffset = mapWidth - allCards.length * destCardWidth;
    const offset = isPending ? pendingOffset + baseOffset : baseOffset;
    const fillColor = destColorMap[i]?.code || 0x000000;

    container.setVisible(true).setX(destCardX + offset);

    container
      .getByName('card')
      .setStrokeStyle(4, strokeColor)
      .setFillStyle(fillColor, 0.3);

    const checkmark = container.getByName('checkmark');
    checkmark.setVisible(isCompleted);

    const ind1 = container.getByName('indicator1');
    const ind2 = container.getByName('indicator2');
    const line = container.getByName('line');
    const lineData = line.getData('points');

    const fixX = -ind1.parentContainer.x;
    const fixY = -ind1.parentContainer.y;

    ind1
      .setPosition(ind1.getData('p')[0] + fixX, ind1.getData('p')[1] + fixY)
      .setFillStyle(fillColor, indicatorAlpha)
      .setVisible(isSelected);
    ind2
      .setPosition(ind2.getData('p')[0] + fixX, ind2.getData('p')[1] + fixY)
      .setFillStyle(fillColor, indicatorAlpha)
      .setVisible(isSelected);

    line
      .setTo(
        lineData[0] + fixX,
        lineData[1] + fixY,
        lineData[2] + fixX,
        lineData[3] + fixY
      )
      .setStrokeStyle(1, fillColor, lineAlpha)
      .setVisible(isSelected);
  });
};

export const getEndGameDestPos = () => {
  const pos = [];
  const spacing = 15;

  let x = mapX + spacing;
  let y = mapHeight + spacing;
  let row = 1;
  while (row < 3) {
    const coord = [x, y];
    pos.push(coord);

    x += destCardWidth + spacing;
    if (x > mapWidth + mapX) {
      x = mapX;
      y += destCardHeight + spacing * 2;
      row += 1;
    }
  }

  return pos;
};

export const renderFaceUpCards = () => {
  let container = displayList.getByName('faceUpCards');

  if (!container) {
    const numFaceUpCards = gameState.faceUpCards.numCards;
    const c = scene.add.container().setName('faceUpCards');
    for (let i = 0; i < numFaceUpCards; i++) {
      c.add(
        scene.add
          .image()
          .setPosition(cardsX, cardsY + cardsYDelta * i)
          .setOrigin(0, 0)
      );
    }
    gameState.faceUpCards.initObjs();

    container = displayList.getByName('faceUpCards');
  }

  const cards = gameState.faceUpCards.cards;
  const objs = container.getAll();

  objs.forEach((o, i) => {
    const color = cards[i]?.color;

    if (color) {
      o.setTexture(color);
    } else {
      o.setTexture();
    }
  });
};

const tWidth = 35;
const tHeight = 18;

const routeWidth = 40;

const longestTextY = 800;

export const renderBoard = () => {
  let obj = displayList.getByName('board');

  // Initial rendering
  if (!obj) {
    const c = scene.add.container().setName('board');
    c.add(
      scene.add
        .image(mapX, mapY, 'map')
        .setScale(mapScale)
        .setOrigin(0)
        .setName('map')
        .setDepth(-1)
    );

    // Routes
    gameState.board.routes.forEach((r) => {
      const cityPos1 = CITIES.filter((c) => c.id === r.cities[0])[0].coords;
      const cityPos2 = CITIES.filter((c) => c.id === r.cities[1])[0].coords;
      const { x, y, dist, angle } = getRouteProps(cityPos1, cityPos2);

      c.add(
        scene.add
          .rectangle()
          .setName(`route.${r.id}`)
          .setPosition(x, y)
          .setSize(dist, routeWidth)
          .setAngle(angle)
        // .setStrokeStyle(5, 0xff0000, 1)
      );

      r.initObjs();
    });

    c.add(
      scene.add.text(cardsX, longestTextY).setName('longest').setFontSize(48)
    );

    obj = displayList.getByName('board');
  }

  // Rendering
  gameState.board.routes.forEach((r) => {
    r.tracks.forEach((track, i) => {
      const name = `route.${r.id}.${i}`;
      let trackContainer = obj.getByName(name);

      if (!trackContainer) {
        const ownerId = track.owner;
        const trainCoords = track.coords;

        if (ownerId) {
          trackContainer = scene.add.container().setName(name);
          obj.add(trackContainer);

          const player = gameState.getPlayer(ownerId);
          const trainAngles = calculateTrainAngle(r);

          trainCoords.forEach((trainCoord, j) => {
            trackContainer.add(
              scene.add
                .rectangle(trainCoord[0], trainCoord[1], tWidth, tHeight)
                .setFillStyle(player.color, 1)
                .setStrokeStyle(4, 0x000000)
                .setAngle(trainAngles[j])
            );
          });
        }
      }
    });
  });

  const longest = obj.getByName('longest').setText(`🚂🚂`);
};

export const renderCurrentTurnMessage = () => {
  let obj = displayList.getByName('currentTurnMessage');

  if (!obj) {
    scene.add
      .text()
      .setName('currentTurnMessage')
      .setPosition(700, 0)
      .setFontSize(42)
      .setFill('black')
      .setBackgroundColor('gray');

    obj = displayList.getByName('currentTurnMessage');
  }

  const currentPlayerId = scene.gameState.getCurrentTurnId();
  const player = scene.gameState.getPlayer(localPlayerId);

  const NUM_KEEP_DEST_CARDS = scene.gameState.settings.NUM_KEEP_DEST_CARDS;

  const isInitial = player.destCards.length == 0;
  const minKeep = isInitial ? NUM_KEEP_DEST_CARDS[0] : NUM_KEEP_DEST_CARDS[1];

  let text = 'Your turn!';
  if (player.actionContextContains('decideDestCards')) {
    text = `Confirm destinations! [${minKeep}]`;
  } else if (player.actionContextContains('drawAgain')) {
    text = 'Draw second card!';
  } else if (player.actionContextContains('gameOver')) {
    text = 'Game over!';
  } else if (gameState.isFinalTurn()) {
    text = 'Final turn!';
  } else if (localPlayerId !== currentPlayerId) {
    text = '';
  }
  obj.setText(text);
};

export const renderCurrentTurnEmoji = () => {
  const obj = displayList.getByName('currentTurnEmoji');

  if (!obj) {
    const firstPlayerId = gameState.getCurrentTurnId();
    const container = displayList.getByName(firstPlayerId);
    const x = container.x + playerCardWidth / 1.2;
    const y = container.y + playerCardWidth / 2.5;

    scene.add
      .text(x, y, '👈')
      .setName('currentTurnEmoji')
      .setFontSize(56)
      .setDepth(4);
  }
};

export const renderConfirmButton = (button) => {
  const obj = button.obj;

  const player = scene.gameState.getPlayer(localPlayerId);
  const isVisible = player.hasPendingDestCards();

  obj
    .setPosition(1400, 900)
    .setText('Confirm')
    .setFill('black')
    .setFontSize(40)
    .setVisible(isVisible);
};
