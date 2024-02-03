import Deck from './Deck';
import Player from './Player';

export default class GameState {
  constructor(scene) {
    this.scene = scene;

    this.initDeck = new Deck();
    this.players = [];

    this.currentTurn = null;
    this.deck = this.initDeck;
    this.events = [];
    this.board = [];

    this.eventsQueue = [];
  }

  getJSONObject = () => {
    const obj = {};
    obj['deck'] = this.deck.getJSONData();
    obj['players'] = this.players.map((p) => p.uid);

    return obj;
  };
  setJSONObject = (initGameState) => {
    this.initDeck.setJSONData(initGameState.deck);
    this.deck.setJSONData(initGameState.deck);

    this.players = initGameState.players.map((p) => new Player(this.scene, p));
  };

  addPlayer = (player) => this.players.push(player);
  getPlayer = (id) => this.players.filter((p) => p.uid === id)[0];

  setupGame = () => {
    this.currentTurn = this.players[0].uid
  }
}
