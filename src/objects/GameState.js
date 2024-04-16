import Board from './Board';
import Deck from './Deck';
import Player from './Player';
import DestDeck from './DestDeck';
import FaceUpCards from './FaceUpCards';
import ShuffleCmd from '../commands/ShuffleCmd';
import {
  NUM_FACEUP_CARDS,
  NUM_START_CARDS,
  DEST_CARD_SETTINGS,
  NUM_PLAYERS_SINGLE_BUILD,
} from '../helpers/settings';
import { DESTINATIONS } from '../helpers/boardConsts';

let playerId = localStorage.getItem('uid');

export default class GameState {
  constructor(scene, players, settings) {
    this.scene = scene;

    this.players = players.map((p, i) => new Player(scene, this, p, i));
    this.settings = this.setupSettings(settings);

    this.status = 'started';
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

  setupSettings = (mode) => {
    const settings = {};
    settings.mode = mode;

    settings.isSingleBuild = this.players.length <= NUM_PLAYERS_SINGLE_BUILD;
    settings.NUM_DRAW_DEST_CARDS = DEST_CARD_SETTINGS[mode].NUM_DRAW_DEST_CARDS;
    settings.NUM_KEEP_DEST_CARDS = DEST_CARD_SETTINGS[mode].NUM_KEEP_DEST_CARDS;

    if (mode === 'base') {
      settings.DESTINATIONS = DESTINATIONS.filter((d) => !d.tags);
    } else if (mode === 'mega') {
      settings.DESTINATIONS = DESTINATIONS;
    }

    return settings;
  };

  setupGame = () => {
    console.log('Setting up game....');
    // Turn order
    this.currentTurn = this.players[0].id;

    this.players.forEach((p, i) => {
      p.order = i;
    });

    // Deal out faceup cards
    for (let i = 0; i < NUM_FACEUP_CARDS; i++) {
      console.log('replacing')
      const card = this.deck.draw();
      this.faceUpCards.replaceFaceUpCard(card);
    }

    // Deal out train/dest cards to players
    this.players.forEach((p) => {
      for (let i = 0; i < NUM_START_CARDS; i++) {
        const card = this.deck.draw();
        p.addCard(card);
      }
      for (let i = 0; i < this.settings.NUM_DRAW_DEST_CARDS[0]; i++) {
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

  beginFinalTurn = () => (this.status = 'finalTurn');
  isFinalTurn = () => this.status === 'finalTurn';
  isGameOver = () => {
    let isGameOver = true;
    this.players.forEach((p) => {
      if (!p.actionContextContains('gameOver')) {
        isGameOver = false;
      }
    });
    return isGameOver;
  };
}
