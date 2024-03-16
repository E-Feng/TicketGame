import Board from './Board';
import Deck from './Deck';
import Player from './Player';
import DestDeck from './DestDeck';
import FaceUpCards from './FaceUpCards';
import ShuffleCmd from '../commands/ShuffleCmd';
import {
  NUM_FACEUP_CARDS,
  NUM_START_CARDS,
  NUM_START_DEST_CARDS,
} from '../helpers/settings';

let playerId = localStorage.getItem('uid');

export default class GameState {
  constructor(scene, players, settings) {
    this.scene = scene;

    this.players = players.map((p, i) => new Player(scene, this, p, i));

    this.currentTurn = this.players[0].id;
    this.deck = new Deck(scene, this);
    this.faceUpCards = new FaceUpCards(scene, this);
    this.board = new Board(scene, this);
    this.destDeck = new DestDeck(scene, this);

    this.events = [];
    this.eventsQueue = [];
  }

  setupServerEvents = () => {
    const shufflePlayersPayload = { array: 'players', seed: Math.random() };
    const shuffleDeckPayload = { array: 'deck', seed: Math.random() };
    const shuffleDestCardsPayload = { array: 'dests', seed: Math.random() };
    if (playerId === this.currentTurn) {
      new ShuffleCmd(this.scene, this, '', shufflePlayersPayload, true);
      new ShuffleCmd(this.scene, this, '', shuffleDeckPayload, true);
      new ShuffleCmd(this.scene, this, '', shuffleDestCardsPayload, true);
    }
  };

  setupGame = () => {
    console.log('Setting up game....');
    this.currentTurn = this.players[0].id;

    this.players.forEach((p, i) => {
      p.order = i;
      p.objGroup.order = i;
    });

    // Deal out faceup cards
    for (let i = 0; i < NUM_FACEUP_CARDS; i++) {
      const card = this.deck.draw();
      this.faceUpCards.replaceFaceUpCard(card);
    }

    // Deal out train/dest cards to players
    this.players.forEach((p) => {
      for (let i = 0; i < NUM_START_CARDS; i++) {
        const card = this.deck.draw();
        p.addCard(card);
      }
      for (let i = 0; i < NUM_START_DEST_CARDS; i++) {
        const destCard = this.destDeck.draw();
        p.addPendingDestCard(destCard);
      }
      p.addActionContext('decideDestCards');
    });
  };

  addPlayer = (player) => this.players.push(player);
  getPlayer = (id) => this.players.filter((p) => p.id === id)[0];

  getCurrentTurnId = () => this.currentTurn;
  setCurrentTurn = (idx) => (this.currentTurn = this.players[idx].id);
  isPlayersCurrentTurn = (id) => this.currentTurn === id;
}
