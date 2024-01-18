import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import Phaser from 'phaser';

import Game from './scenes/Game';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import.meta.env.VITE_FIREBASE_KEY

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scene: [Game],
};

function App() {
  const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_KEY,
    authDomain: 'ticketgame-ffc51.firebaseapp.com',
    databaseURL: 'https://ticketgame-ffc51-default-rtdb.firebaseio.com',
    projectId: 'ticketgame-ffc51',
    storageBucket: 'ticketgame-ffc51.appspot.com',
    messagingSenderId: '408380915939',
    appId: '1:408380915939:web:5858627260db04475445d6',
  };
  initializeApp(firebaseConfig);

  const db = getDatabase();
  const roomId = 'abcde';

  let dataRef;
  let playerRef;
  let data = {};

  // let round = 1;
  const [round, setRound] = useState(1);

  const initGame = () => {
    onValue(dataRef, (snapshot) => {
      console.log('Grabbing new data');
      data = snapshot.val();

      console.log(data);
      setRound(data.init.round);
    });

    if (!data.init) {
      set(ref(db, `${roomId}/init/`), {
        round: round,
      });
    }
  };

  const auth = getAuth();
  signInAnonymously(auth);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const playerId = user.uid;

      dataRef = ref(db, roomId);
      playerRef = ref(db, `${roomId}/players/${playerId}`);

      set(playerRef, {
        id: playerId,
      });

      initGame();
    }
  });

  const handleClick = () => {
    set(ref(db, `${roomId}/init/`), {
      round: round + 1,
    });
  };

  console.log(data);

  useEffect(() => {
    new Phaser.Game(config);
  }, [config]);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={handleClick}>round is {round}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
