import Phaser from 'phaser';

import GameState from '../objects/GameState';
import { initRender } from '../helpers/renderer';
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
    initEventsListener(this.gameState);
    this.gameState.setupServerEvents();
  }

  update() {
    if (!this.initServerEventsLoaded) {
      if (this.gameState.events.length >= 2) {
        this.initServerEventsLoaded = true;
        this.gameState.setupGame();
        initRender(this.gameState);
      }
    }

    if (this.gameState.eventsQueue.length > 0) {
      console.log('invoking', this.gameState.eventsQueue[0].command);
      const event = this.gameState.eventsQueue.shift();
      this.gameState.events.push(event);

      const cmd = createCommand(
        event.command,
        this.gameState,
        event.playerId,
        event.payload
      );
      cmd.apply();

      console.log(this.gameState);
    }
  }
}
