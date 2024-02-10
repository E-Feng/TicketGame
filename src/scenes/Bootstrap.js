import Phaser from 'phaser';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  onDisconnect,
} from 'firebase/database';

import { FIREBASE_CONFIG } from '../helpers/settings';
import InitGameState from '../helpers/InitGameState';

let initRef;
let eventRef;
let playerRef;
let selfRef;

let players;

export const sendEventToFirebase = (event) => {
  push(eventRef, event);
};

export const initEventsListener = (gameState) => {
  onValue(eventRef, (snapshot) => {
    if (!snapshot.val()) return;

    console.log('Grabbing new data');
    const data = snapshot.val();

    const keys = Object.keys(data);
    const lastKey = keys[keys.length - 1];
    const lastEvent = data[lastKey];

    gameState.eventsQueue.push(lastEvent);
  });
};

export default class Bootstrap extends Phaser.Scene {
  constructor() {
    super('bootstrap');
  }

  initGameState() {
    const gameState = new InitGameState();

    players.forEach((player) => gameState.addPlayer(player));
    gameState.randomizeTurnOrder()

    const data = gameState.getJSONObject();
    set(initRef, data);
  }

  preload() {
    initializeApp(FIREBASE_CONFIG);

    const db = getDatabase();
    const roomId = Math.floor(new Date().getTime() / 5000);

    eventRef = ref(db, `${roomId}/events/`);
    playerRef = ref(db, `${roomId}/players/`);
    initRef = ref(db, `${roomId}/init/`);

    // Setting up player, lobby ref
    const auth = getAuth();
    signInAnonymously(auth);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const playerId = user.uid;
        localStorage.setItem('uid', playerId);

        selfRef = ref(db, `${roomId}/players/${playerId}`);
        set(selfRef, { uid: playerId });

        onDisconnect(selfRef).remove();
      }
    });

    // Setting up game state ref
    onValue(initRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      this.scene.start('game', data);
    });
  }

  create() {
    const texts = [];

    onValue(playerRef, (snapshot) => {
      texts.forEach((text) => text.destroy());
      texts.length = 0;

      if (!snapshot.val()) return;

      players = Object.values(snapshot.val());

      players.forEach((player, i) => {
        const text = this.add.text(100, i * 100 + 100, [player.uid]);
        texts.push(text);
      });
    });

    this.startButton = this.add.text(200, 300, ['START']).setInteractive();
    this.startButton.on('pointerdown', () => this.initGameState());
  }
}
