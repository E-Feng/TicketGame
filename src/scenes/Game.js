import Phaser from 'phaser';

import GameState from '../helpers/GameState';
import Player from '../helpers/Player';
import { createCommand } from '../commands/commandUtil';
import { initEventsListener } from './Bootstrap';
import { COLOR_VALUES } from '../helpers/settings';
import DrawCommand from '../commands/DrawCommand';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.gameState;
  }

  init(gameState) {
    this.gameState = gameState
  }

  preload() {
    for (const color in COLOR_VALUES) {
      this.load.image(color, `src/assets/${color}.png`);
    }
  }

  create() {
    this.gameState = new GameState;
    initEventsListener(this.gameState)

    const player = new Player(this);
    this.gameState.addPlayer(player)

    this.dealText = this.add.text(300, 300, ['DECK HERE']).setInteractive();
    // this.dealText.on('pointerdown', () => this.deck.dealToHand(this.player));
    this.dealText.on('pointerdown', () => {
      const cmd = new DrawCommand(this.gameState, player.id, true)
    })
  }

  update() {
    if (this.gameState.eventsQueue.length > 0) {
      console.log("invoking", this.gameState.eventsQueue[0])
      const event = this.gameState.eventsQueue.shift()

      const cmd = createCommand(event.command, this.gameState, event.playerId)
      cmd.apply()
    }
  }
}
