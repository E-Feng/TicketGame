import Deck from './Deck';

import { shuffleArray } from '../utils/funcs';

export default class InitGameState {
  constructor() {
    this.deck = new Deck();
    this.players = [];
  }

  getJSONObject = () => {
    const obj = {};
    obj['deck'] = this.deck.getJSONData();
    obj['players'] = this.players.map((p) => p.uid);

    return obj;
  };

  addPlayer = (player) => this.players.push(player);

  randomizeTurnOrder = () => shuffleArray(this.players);
}
