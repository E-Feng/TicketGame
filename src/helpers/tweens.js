let scene;
let gameState;
let displayList;

export const initTweenVars = (initScene) => {
  scene = initScene;
  gameState = initScene.gameState;
  displayList = initScene.sys.displayList;
};

export const drawTween = (payload) => {
  let obj;
  let texture;

  if (payload !== undefined) {
    obj = displayList.getByName('faceUpCards').getAll()[payload];
    texture = gameState.faceUpCards.cards[payload].color;
  } else {
    obj = displayList.getByName('deck');
    texture = 'deck';
  }

  const cardTween = scene.add.image(obj.x, obj.y, texture);
  scene.tweens.add({
    targets: cardTween,
    x: 0,
    y: 200,
    duration: 500,
    delay: 50,
    ease: 'Linear',
    onComplete: () => cardTween.destroy(),
  });
};
