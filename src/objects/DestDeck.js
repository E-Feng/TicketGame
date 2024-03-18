import DestCard from './DestCard';
import DrawDestCmd from '../commands/DrawDestCmd';
import { renderDestDeck } from '../helpers/renderer';
import { DESTINATIONS } from '../helpers/boardConsts';

const localPlayerId = localStorage.getItem('uid');

export default class DestDeck {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;
    this.destCards = DESTINATIONS.map((d) => new DestCard(scene, this, d));
  }

  initObjs = () => {
    this.scene.sys.displayList
      .getByName('destDeck')
      .setInteractive()
      .on('pointerdown', () => {
        new DrawDestCmd(this.scene, this.gameState, localPlayerId, null, true);
      });
  };

  draw = () => this.destCards.pop();
  discard = (destCard) => this.destCards.unshift(destCard);
}
