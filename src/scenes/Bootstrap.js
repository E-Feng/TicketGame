import Phaser from 'phaser';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';

import { FIREBASE_CONFIG } from '../helpers/settings';

export default class Bootstrap extends Phaser.Scene {
  constructor() {
    super('bootstrap');
  }

  preload() {
    initializeApp(FIREBASE_CONFIG);

    const db = getDatabase();
    const roomId = 'abcde';

    let dataRef;
    let playerRef;
    let data = {};

    const initGame = () => {
      onValue(dataRef, (snapshot) => {
        console.log('Grabbing new data');
        data = snapshot.val();

        console.log(data);
      });

      if (!data.init) {
        set(ref(db, `${roomId}/init/`), {
          // round: round,
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
  }

  create() {
    this.scene.launch('game');
  }
}
