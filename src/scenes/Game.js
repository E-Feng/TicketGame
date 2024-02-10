import Phaser from 'phaser';

import GameState from '../helpers/GameState';
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
    for (const color in COLOR_VALUES) {
      this.load.image(color, `src/assets/${color}.png`);
    }
  }

  create() {
    console.log(this.gameState);
    initEventsListener(this.gameState);
    this.gameState.setupGame();

    this.dealText = this.add.text(500, 300, ['DECK HERE']).setInteractive();
    // this.dealText.on('pointerdown', () => this.deck.dealToHand(this.player));
    this.dealText.on('pointerdown', () => {
      const cmd = new DrawCmd(this.gameState, playerId, null, true);
    });
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
