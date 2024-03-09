import Command from './Command';
import { shuffleArray } from '../utils/funcs';

export default class ShuffleCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

    this.event = {
      command: 'shuffle',
      playerId: null,
      payload: payload,
    };

    if (init) {
      this.send(this.event);
    }
  }

  apply = () => {
    let array;

    switch (this.payload.array) {
      case 'players':
        array = this.players;
        break;
      case 'deck':
        array = this.deck.cards;
        break;
      case 'dests':
        array = this.destDeck.destCards;
        break;
    }
    shuffleArray(array, this.payload.seed);
  };
}
