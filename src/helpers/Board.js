import Route from './Route';
import BuildCmd from '../commands/BuildCmd';
import { renderBoard } from './renderer';
import { ROUTES } from './settings';

let playerId = localStorage.getItem('uid');

export default class Board {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.routes = ROUTES.map((r) => {
      return new Route(scene, gameState, r)
    });
  }

  render = () => {
    renderBoard(this.scene, this.routes)
  }

  getRouteById = (id) => this.routes.filter(r => r.id === id)[0]

  // render = () => {
  //   this.board.forEach((r, i) => {
  //     const num = r.number;
  //     let x = 50;
  //     let y = i * 100 + 50;

  //     const xCenter = x + num * 20;
  //     const box = this.scene.add.rectangle(
  //       xCenter,
  //       y,
  //       num * 25,
  //       20,
  //       '0x00ff00',
  //       0.5
  //     );
  //     const rectangle = new Phaser.Geom.Rectangle();

  //     this.scene.add.text(x, y, [r.cities[0]]);
  //     x += 50;
  //     for (let i = 0; i < num; i++) {
  //       this.scene.add.rectangle(x, y, 20, 10, '0xffffff');
  //       x += 25;
  //     }
  //     this.scene.add.text(x, y, [r.cities[1]]);

  //     box.setInteractive();
  //     box.on('pointerdown', () => {
  //       console.log(playerId);
  //       new BuildCmd(this.gameState, playerId, null, true);
  //     });
  //   });
  // };
}
