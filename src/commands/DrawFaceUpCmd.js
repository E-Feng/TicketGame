import Command from './Command';
import EndTurnCmd from './EndTurnCmd';
import { drawTween } from '../helpers/tweens';
import { NUM_WILD_REPLACE, NUM_FACEUP_CARDS } from '../helpers/settings';

const localPlayerId = localStorage.getItem('uid');

export default class DrawFaceUpCmd extends Command {
  constructor(scene, gameState, playerId, payload, init) {
    super(scene, gameState, playerId, payload);

    this.clickedCard = gameState.faceUpCards.getCardByIndex(payload);

    this.isSecondDraw = this.player.actionContextContains('drawAgain');
    this.isWildCard = this.clickedCard.color === 'wild';

    this.event = {
      command: 'drawFaceUp',
      playerId: playerId,
      payload: payload,
    };

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    const cond1 = this.gameState.getCurrentTurnId() === this.playerId;
    const cond2 = this.player.isActionContextEmpty() || this.isSecondDraw;
    const cond3 = this.isSecondDraw && this.isWildCard;

    const allCond = cond1 && cond2 && !cond3;
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      drawTween({
        name: 'faceUpCards',
        playerId: this.playerId,
        payload: this.payload,
      });

      this.player.addCard(this.clickedCard);
      this.faceUpCards.removeCardByIndex(this.payload);

      const emptyCount = this.faceUpCards.getEmptyCount();
      for (let i = 0; i < emptyCount; i++) {
        const newCard = this.gameState.deck.draw();
        this.faceUpCards.replaceFaceUpCard(newCard);
      }

      // Replace all if 3 wilds present
      const wildCount = this.faceUpCards.getWildCount();
      if (wildCount >= NUM_WILD_REPLACE) {
        const replaceCount = Math.min(this.deck.count(), NUM_FACEUP_CARDS);

        for (let i = 0; i < replaceCount; i++) {
          const newCard = this.deck.draw();
          const removedCard = this.faceUpCards.removeCardByIndex(i);

          this.faceUpCards.replaceFaceUpCard(newCard);
          this.deck.discard(removedCard);
        }
      }

      this.end(this.clickedCard);
    }
  };

  end = (clickedCard) => {
    if (this.playerId === localPlayerId) {
      const drewWild = clickedCard.color === 'wild';
      const isSecondDraw = this.isSecondDraw;
      const isNoDrawableCards =
        !this.deck.hasCards() && this.faceUpCards.isAllWilds();

      if (drewWild || isSecondDraw || isNoDrawableCards) {
        this.player.clearActionContext();
        new EndTurnCmd(this.scene, this.gameState, this.playerId, null, true);
      } else {
        this.player.addActionContext('drawAgain');
      }

      if (!this.deck.hasCards()) {
        this.deck.shuffleDiscardIntoDeck();
      }
    }

    this.render();
  };

  render = () => {
    this.player.render();
    this.faceUpCards.render();
    this.board.render();
  };
}
