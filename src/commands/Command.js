import { sendEventToFirebase } from '../scenes/Bootstrap';

export default class Command {
  constructor(gameState, playerId, payload) {
    this.gameState = gameState;
    this.playerId = playerId;
    this.payload = payload;

    this.board = gameState.board;
    this.player = gameState.getPlayer(playerId);
    this.deck = gameState.deck;
    this.faceUpCards = gameState.faceUpCards;
  }

  send(event) {
    sendEventToFirebase(event);
  }

  execute(gameState, event) {
    gameState.toInvoke.push(event);
  }
}
