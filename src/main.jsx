import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Bootstrap from './scenes/Bootstrap';
import Game from './scenes/Game';

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scene: [Bootstrap, Game],
};
new Phaser.Game(config)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
