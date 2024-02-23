import Board from './Board';
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
    this.board = new Board(scene, this);

    this.events = [];
    this.eventsQueue = [];
  }

  setupGame = () => {
    for (let i = 0; i < 5; i++) {
      const card = this.deck.draw();
      this.faceUpCards.replaceFaceUpCard(card);
    }
  };

  getPlayer = (id) => this.players.filter((p) => p.uid === id)[0];

  getCurrentTurnId = () => this.currentTurn;
  setCurrentTurn = (idx) => (this.currentTurn = this.players[idx].uid);
  isPlayersCurrentTurn = (id) => this.currentTurn === id;

  isActionContextEmpty = () => this.actionContext.length === 0;
  actionContextContains = (action) => this.actionContext.includes(action);
  addActionContext = (action) => this.actionContext.push(action);
  clearActionContext = () => (this.actionContext.length = 0);
}
