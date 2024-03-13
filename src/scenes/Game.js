import Phaser from 'phaser';

import GameState from '../objects/GameState';
import {
  initRenderVars,
  initRender,
  renderCurrentTurnMessage,
} from '../helpers/renderer';
import { createCommand } from '../utils/cmdUtils';
import { initEventsListener } from './Bootstrap';
import { COLOR_VALUES } from '../helpers/settings';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.gameState;

    this.initServerEventsLoaded = false;
  }

  init(initData) {
    const { players, settings } = initData;
    this.gameState = new GameState(this, players, settings);
  }

  preload() {
    this.load.path = 'src/assets/';

    this.load.image('map', `map.jpg`);
    this.load.image('deck', `deck.png`);
    this.load.image('dest', `dest.png`);

    for (const color in COLOR_VALUES) {
      this.load.image(color, `${color}.png`);
    }
  }

  create() {
    initRenderVars(this);
    initEventsListener(this.gameState);
    this.gameState.setupServerEvents();
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
          newEvent.command,
          this.gameState,
          newEvent.playerId,
          newEvent.payload
        );
        cmd.apply();

        renderCurrentTurnMessage(this);
        console.log(this.gameState);
      }
    }
  }
}
