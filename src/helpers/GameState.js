import Deck from './Deck';
import { COLOR_VALUES } from './settings';

export default class GameState {
  constructor() {
    this.initDeck = new Deck(this, COLOR_VALUES);
    this.players = [];

    this.deck = this.initDeck;
    this.events = [];
    this.board = [];

    this.eventsQueue = [];
  }

  getJSONObject() {
    const obj = { deck: [] };

    this.initDeck.cards.forEach((card) => obj.deck.push(card.color));

    return obj;
  }

  addPlayer(player) {
    this.players.push(player);
  }
}
