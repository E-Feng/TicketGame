import Phaser from 'phaser';

import GameState from '../helpers/GameState';
import { createCommand } from '../commands/commandUtil';
import { initEventsListener } from './Bootstrap';
import { COLOR_VALUES } from '../helpers/settings';
import DrawCommand from '../commands/DrawCommand';

let playerId = localStorage.getItem('uid');

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.gameState;
  }

  init(initGameState) {
    this.gameState = new GameState(this);
    this.gameState.setJSONObject(initGameState);
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

    this.dealText = this.add.text(300, 300, ['DECK HERE']).setInteractive();
    // this.dealText.on('pointerdown', () => this.deck.dealToHand(this.player));
    this.dealText.on('pointerdown', () => {
      const cmd = new DrawCommand(this.gameState, playerId, true);
    });
  }

  update() {
    if (this.gameState.eventsQueue.length > 0) {
      console.log('invoking', this.gameState.eventsQueue[0]);
      const event = this.gameState.eventsQueue.shift();

      const cmd = createCommand(event.command, this.gameState, event.playerId);
      cmd.apply();

      console.log(this.gameState);
    }
  }
}
