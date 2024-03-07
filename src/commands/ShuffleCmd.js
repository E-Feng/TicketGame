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
      console.log('sending', payload)
      this.send(this.event);
    }
  }

  apply = () => {
    let array;

    switch (this.payload.array) {
      case 'deck':
        array = this.deck.cards;
        break;
      case 'dests':
        array = this.destDeck.destCards;
        break;
    }
    console.log('shuffling')
    shuffleArray(array, this.payload.seed);
  };
}
