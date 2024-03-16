import DestCard from './DestCard';
import DrawDestCmd from '../commands/DrawDestCmd';
import { renderDestDeck } from '../helpers/renderer';
import { DESTINATIONS } from '../helpers/boardConsts';

const localPlayerId = localStorage.getItem('uid');

export default class DestDeck {
  constructor(scene, gameState) {
    this.scene = scene;
    this.obj = scene.add.image();
    this.destCards = DESTINATIONS.map((d) => new DestCard(scene, this, d));

    this.obj.setInteractive();
    this.obj.on('pointerdown', () => {
      new DrawDestCmd(scene, gameState, localPlayerId, null, true);
    });
  }

  render = () => renderDestDeck(this);

  draw = () => this.destCards.pop();
  discard = (destCard) => this.destCards.unshift(destCard);
}
