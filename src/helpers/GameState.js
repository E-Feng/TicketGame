import Deck from './Deck';
import Player from './Player';
import FaceUpCards from './FaceUpCards';

export default class GameState {
  constructor(scene, initGameState) {
    this.scene = scene;

    this.initDeck = new Deck(initGameState.deck);
    this.players = initGameState.players.map((p) => new Player(scene, p));

    this.currentTurn = this.players[0].uid;
    this.actionContext = [];
    this.deck = this.initDeck;
    this.faceUpCards = new FaceUpCards(scene, this);
    this.board = [];

    this.events = [];
    this.eventsQueue = [];
  }

  setupGame = () => {
    for (let i = 0; i < 5; i++) {
      const card = this.deck.draw();
      this.faceUpCards.replaceFaceUpCard(card);
    }
    this.faceUpCards.render();
  };

  getPlayer = (id) => this.players.filter((p) => p.uid === id)[0];

  getCurrentTurnId = () => this.currentTurn;
  setCurrentTurn = (idx) => (this.currentTurn = this.players[idx].uid);

  isActionContextEmpty = () => this.actionContext.length === 0;
  actionContextContains = (action) => this.actionContext.includes(action);
  addActionContext = (action) => this.actionContext.push(action);
  clearActionContext = () => (this.actionContext.length = 0);
}
