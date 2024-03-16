import { sendEventToFirebase } from '../scenes/Bootstrap';

export default class Command {
  constructor(scene, gameState, playerId, payload) {
    this.scene = scene;
    this.gameState = gameState;
    this.playerId = playerId;
    this.payload = payload;

    this.board = gameState.board;
    this.players = gameState.players;
    this.player = gameState.getPlayer(playerId);
    this.deck = gameState.deck;
    this.faceUpCards = gameState.faceUpCards;
    this.destDeck = gameState.destDeck;
  }

  send(event) {
    sendEventToFirebase(event);
  }
}
