import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Bootstrap from './scenes/Bootstrap';
import Game from './scenes/Game.js';

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scene: [Bootstrap, Game],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
new Phaser.Game(config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
