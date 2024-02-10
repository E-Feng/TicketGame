import Command from './Command';
import EndTurnCmd from './EndTurnCmd';

export default class DrawFaceUpCardCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

    this.clickedCard = gameState.faceUpCards.getCardByIndex(payload);

    this.isSecondDraw = gameState.actionContextContains('drawAgain');
    this.isWildCard = this.clickedCard.color === 'wild';

    this.event = {
      command: 'drawFaceUpCard',
      playerId: playerId,
      payload: payload,
    };

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    const cond1 = this.gameState.getCurrentTurnId() === this.playerId;
    const cond2 = this.gameState.isActionContextEmpty() || this.isSecondDraw;
    const cond3 = this.isSecondDraw && this.isWildCard;

    const allCond = cond1 && cond2 && !cond3;
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      const faceUpCards = this.gameState.faceUpCards;

      this.player.addCard(this.clickedCard);
      this.faceUpCards.removeCardByIndex(this.payload)

      const newCard = this.gameState.deck.draw();
      faceUpCards.replaceFaceUpCard(newCard);

      this.end(this.clickedCard);
    }
  };

  end = (clickedCard) => {
    if (this.playerId === localStorage.getItem('uid')) {
      if (clickedCard.color === 'wild' || this.isSecondDraw) {
        new EndTurnCmd(this.gameState, this.playerId, null, true);
      } else {
        this.gameState.addActionContext('drawAgain');
      }

      this.player.render();
    }
    this.gameState.faceUpCards.render();
  };
}
