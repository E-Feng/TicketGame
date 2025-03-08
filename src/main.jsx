import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Bootstrap from './scenes/Bootstrap';
import Game from './scenes/Game.js';
import { width, height } from './helpers/renderer.js';

let roomId;
const urlParam = window.location.pathname.replace('/', '');
if (!urlParam) {
  roomId = Math.floor(new Date().getTime() / 10000);
  window.location.pathname = `/${roomId}`;
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: width,
  height: height,
  backgroundColor: 0xc9d3dc,
  scene: [Bootstrap, Game],
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
const game = new Phaser.Game(config);
game.roomId = urlParam || roomId;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
