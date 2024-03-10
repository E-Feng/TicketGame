import BuildCmd from '../commands/BuildCmd';
import { TRAIN_POINTS } from '../helpers/settings';

const localPlayerId = localStorage.getItem('uid');

export default class Route {
  constructor(scene, gameState, props) {
    this.scene = scene;
    this.obj = scene.add.rectangle();
    this.id = props.id;
    this.cities = props.cities;
    this.length = props.length;
    this.tracks = props.tracks.map((t, i) => {
      return {
        owner: null,
        color: t,
        coords: props.coords.slice(i * this.length, this.length * (i + 1)),
      };
    });

    this.obj.setVisible(false);
    this.obj.setInteractive();
    this.obj.on('pointerdown', () => {
      const player = gameState.getPlayer(localPlayerId);
      const payment = player.getSelectedCards().map((c) => c.color);
      const payload = { id: this.id, payment: payment };

      new BuildCmd(gameState, localPlayerId, payload, true);
    });
  }

  getRouteLength = () => this.length;
  getPointValue = () => TRAIN_POINTS[this.length];

  getOpenTracks = () => this.tracks.filter((t) => t.owner === null);

  canBuildTrack = (playerId, payment) => {
    const allTracks = this.tracks;
    const tracks = this.getOpenTracks();

    if (tracks.length === 0) return false;
    if (allTracks.some((t) => t.owner === playerId)) return false;

    // Incorrect count, 2 nonwild colors
    if (payment.length !== this.length) return false;
    if (new Set(payment.filter((c) => c !== 'wild')).size > 1) return false;

    // All wilds, grey track, color track matches
    if (payment.every((c) => c === 'wild')) return true;
    if (tracks[0].color === 'grey') return true;
    if (tracks.map((t) => t.color).includes(payment[0])) return true;

    return false;
  };

  setOwner = (playerId, trackColor) => {
    const tracks = this.getOpenTracks();
    const colors = [trackColor, 'grey'];

    const track = tracks.filter(
      (t) => colors.includes(t.color) || trackColor === 'wild'
    )[0];

    track.owner = playerId;
  };
}
