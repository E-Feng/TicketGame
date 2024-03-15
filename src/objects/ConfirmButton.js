import DecideDestCmd from '../commands/DecideDestCmd';

const localPlayerId = localStorage.getItem('uid');

export default class ConfirmButton {
  constructor(scene, gameState) {
    this.scene = scene;

    this.obj = scene.add
      .text()
      .setInteractive()
      .on('pointerdown', () => {
        const player = gameState.getPlayer(localPlayerId);
        const cards = player.getSelectedDestCards();
        const payload = { selectedIds: cards.map((c) => c.id) };

        new DecideDestCmd(gameState, localPlayerId, payload, true);
      });
  }
}
