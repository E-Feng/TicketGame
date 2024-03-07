import DestCard from './DestCard';
import { renderDestDeck } from '../helpers/renderer';

import { DESTINATIONS } from '../helpers/settings';

export default class DestDeck {
  constructor(scene, gameState) {
    this.scene = scene;
    this.obj = scene.add.image();
    this.destCards = DESTINATIONS.map((d) => new DestCard(scene, this, d));

    this.obj.setInteractive();
    // this.obj.on('pointerdown', () => {
    //   // new DrawCmd(gameState, playerId, null, true);
    // });
  }

  render = () => renderDestDeck(this);

  draw = () => this.destCards.pop();
}
