import Phaser from 'phaser';

import GameState from '../helpers/GameState';
import { initRender } from '../helpers/renderer';
import { createCommand } from '../utils/cmdUtils';
import { initEventsListener } from './Bootstrap';
import { COLOR_VALUES } from '../helpers/settings';
import DrawCmd from '../commands/DrawCmd';

let playerId = localStorage.getItem('uid');

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.gameState;
  }

  init(initGameState) {
    this.gameState = new GameState(this, initGameState);
  }

  preload() {
    this.load.image('map', `src/assets/map.jpg`);
    this.load.image('deck', `src/assets/deck.png`);

    for (const color in COLOR_VALUES) {
      this.load.image(color, `src/assets/${color}.png`);
    }
  }

  create() {
    initEventsListener(this.gameState);
    this.gameState.setupGame();
    initRender(this.gameState);
  }

  update() {
    if (this.gameState.eventsQueue.length > 0) {
      // console.log('invoking', this.gameState.eventsQueue[0]);
      const event = this.gameState.eventsQueue.shift();

      const cmd = createCommand(
        event.command,
        this.gameState,
        event.playerId,
        event.payload
      );
      cmd.apply();
      this.gameState.events.push(event);

      console.log(this.gameState);
    }
  }
}
