import BuildCmd from '../commands/BuildCmd';
import { renderBoard } from './renderer';
import { ROUTES } from './settings';

let playerId = localStorage.getItem('uid');

export default class Board {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.routes = ROUTES.map((r) => {
      return {
        ...r,
        owner: r.tracks.length === 2 ? [null, null] : [null],
      };
    });
    this.objs = [];

    this.initObjects();
  }

  initObjects = () => {
    this.routes.forEach((r) => {
      const obj = this.scene.add.rectangle();
      obj.setData('data', r)

      obj.setInteractive();
      obj.on('pointerdown', () =>
        new BuildCmd(this.gameState, playerId, 1, true)
      );

      this.objs.push(obj)
    });
  };

  render = () => {
    renderBoard(this.scene, this.objs)
  }

  getRouteById = (id) => this.routes.filter(r => r.id === id)[0]

  setOwner = (playerId, routeId, track) => {
    const route = this.getRouteById(routeId);
    const trackIdx = route.tracks.findIndex(t => t === track);

    route.owner[trackIdx] = playerId;
  };

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
