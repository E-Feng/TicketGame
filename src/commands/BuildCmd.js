import { buildTween } from '../helpers/tweens';
import Command from './Command';
import EndTurnCmd from './EndTurnCmd';

const localPlayerId = localStorage.getItem('uid');

export default class BuildCmd extends Command {
  constructor(scene, gameState, playerId, payload, init) {
    super(scene, gameState, playerId, payload);

    this.event = {
      command: 'build',
      playerId: playerId,
      payload: payload,
    };
    this.payment = payload.payment;
    this.route = this.board.getRouteById(payload.id);

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    const cond1 = this.gameState.isPlayersCurrentTurn(this.playerId);
    const cond2 = this.player.isActionContextEmpty();

    const cond3 = this.route.canBuildTrack(this.playerId, this.payment);

    return cond1 && cond2 && cond3;
  };

  apply = () => {
    if (this.isLegal()) {
      buildTween(this.route, this.player.color)

      const trackColor = this.payment[0];
      this.route.setOwner(this.playerId, trackColor);

      this.payment.forEach((color) => {
        const card = this.player.removeCard(color);
        this.deck.discard(card);
      });

      this.player.addPoints(this.route.getPointValue())
      this.player.minusTrains(this.route.getRouteLength())

      this.end();
    }
  };

  end = () => {
    if (this.playerId === localPlayerId) {
      new EndTurnCmd(this.scene, this.gameState, this.playerId, null, true);
    }

    this.render();
  };

  render = () => {
    this.player.render();
    this.board.render();
  };
}
