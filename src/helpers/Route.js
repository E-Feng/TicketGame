import BuildCmd from '../commands/BuildCmd';

let playerId = localStorage.getItem('uid');

export default class Route {
  constructor(scene, gameState, props) {
    this.scene = scene;
    this.obj = scene.add.rectangle();
    this.id = props.id;
    this.cities = props.cities;
    this.number = props.number;
    this.tracks = props.tracks.map((t) => {
      return {
        color: t,
        owner: null,
      };
    });

    this.obj.setInteractive();
    this.obj.on('pointerdown', () => {
      new BuildCmd(gameState, playerId, this.id, true);
    });
  }

  getOpenTracks = () => this.tracks.filter((t) => t.owner === null);

  canBuildTrack = (cards) => {
    const tracks = this.getOpenTracks()
    const n = this.number

    const nWild = cards['wild']
    delete cards.wild
    const nMax = Math.max(...Object.keys(cards).map(c => cards[c]))

    let canBuild = false
    tracks.forEach(t => {
      const color = t.color

      if (color === 'grey') {
        if (nMax + nWild >= n) {
          canBuild = color
        }
      } else {
        if (cards[color] + nWild >= n) {
          canBuild = color
        }
      }
    })
    return canBuild
  }

  setOwner = (playerId, track) => {
    // const trackObj = this.tracks.filter((t) => t.track === track)[0];
    // trackObj.owner = playerId;
  };
}
