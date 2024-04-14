import Phaser from 'phaser';

import GameState from '../objects/GameState';
import { initRenderVars, initRender } from '../helpers/renderer';
import { initTweenVars } from '../helpers/tweens';
import EndGameCmd from '../commands/EndGameCmd';
import { createCommand } from '../utils/cmdUtils';
import { initEventsListener } from './Bootstrap';
import { TRAIN_COLORS_SETUP } from '../helpers/settings';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.gameState = 1;

    this.initServerEventsLoaded = false;
    this.isVictoryScreenStarted = false;
  }

  preload() {
    this.load.path = 'src/assets/';

    this.load.image('map', `map.jpg`);
    this.load.image('deck', `deck.png`);
    this.load.image('destDeck', `destDeck.png`);

    TRAIN_COLORS_SETUP.forEach((colorInfo) => {
      this.load.image(colorInfo.color, `${colorInfo.color}.png`);
    });
  }

  create(initData) {
    const { players, settings, events } = initData;
    const isNewGame = events.length === 0;

    if (isNewGame) {
      this.gameState = new GameState(this, players, settings);

      initEventsListener(this.gameState);
      this.gameState.setupServerEvents();

      initRenderVars(this);
      initTweenVars(this);
    }
  }

  update() {
    if (!this.initServerEventsLoaded) {
      if (this.gameState.events.length >= 3) {
        this.initServerEventsLoaded = true;
        this.gameState.setupGame();
        initRender();
      }
    }

    if (this.gameState.eventsQueue.length > 0) {
      const events = this.gameState.events;
      const newEvent = this.gameState.eventsQueue.shift();
      const id = newEvent.id;

      if (!events.find((e) => e.id === id)) {
        console.log('Invoking', newEvent.command);
        events.push(newEvent);

        const cmd = createCommand(
          this,
          newEvent.command,
          this.gameState,
          newEvent.playerId,
          newEvent.payload
        );
        cmd.apply();

        console.log(this.gameState);
        console.log(this.sys.displayList);
      }
    }

    if (this.gameState.isGameOver() && !this.isVictoryScreenStarted) {
      this.isVictoryScreenStarted = true;

      const cmd = new EndGameCmd(this, this.gameState, null, null);
      cmd.apply();
    }
  }
}
