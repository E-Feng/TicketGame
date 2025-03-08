import Command from './Command';
import { renderPlayerCard, getEndGameDestPos } from '../helpers/renderer';

export default class EndGameCmd extends Command {
  constructor(scene, gameState, playerId, payload) {
    super(scene, gameState, playerId, payload);
  }

  apply = () => {
    console.log('starting end game');
    const displayList = this.scene.sys.displayList;
    const players = this.players;

    this.gameState.status = 'endGame';

    const cardsContainer = displayList.getByName('cards');
    cardsContainer.getAll().forEach((card) => card.setVisible(false));

    const destCardsContainer = displayList.getByName('destCards');
    destCardsContainer
      .getAll()
      .forEach((destCard) => destCard.setVisible(false));

    const destPos = getEndGameDestPos();
    let iDestPos = 0;

    players.forEach((p) => {
      const destCards = p.destCards;

      destCards.forEach((destCard) => {
        p.calculateDestCardPoints(destCard);
        renderPlayerCard(p);

        const pos = destPos[iDestPos];
        const emoji = destCard.isCompleted ? '✔️' : '❌';

        const destCardObj = destCardsContainer.getByName(destCard.id);
        destCardObj.setVisible(true).setPosition(pos[0], pos[1]);
        destCardObj.getByName('card').setFillStyle(p.color, 0.35);
        destCardObj.getByName('checkmark').setText(emoji).setVisible(true);

        iDestPos += 1;
      });
    });
  };
}
