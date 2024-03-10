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

let initRef;
let eventRef;
let playerRef;
let selfRef;

let players;

let isEventsListenerRunning = false;

export const sendEventToFirebase = (event) => {
  push(eventRef, event);
};

export const initEventsListener = (gameState) => {
  onValue(eventRef, (snapshot) => {
    if (!snapshot.val()) return;
    if (isEventsListenerRunning) return;

    isEventsListenerRunning = true;
    console.log('Listener', snapshot);

    const dbEvents = snapshot.val();
    const dbEventKeys = Object.keys(dbEvents);

    const events = gameState.events;
    const lastKey = events[events.length - 1]?.id;

    const idx = dbEventKeys.indexOf(lastKey);

    const newEventKeys = [];
    if (idx < 0) {
      dbEventKeys.forEach((k) => newEventKeys.push(k));
    } else {
      dbEventKeys.slice(idx + 1).forEach((k) => newEventKeys.push(k));
    }

    newEventKeys.forEach((key) => {
      const event = {
        id: key,
        ...dbEvents[key],
      };
      gameState.eventsQueue.push(event);
    });

    isEventsListenerRunning = false;
  });
};

export default class Bootstrap extends Phaser.Scene {
  constructor() {
    super('bootstrap');
  }

  initGameState() {
    // const gameState = new InitGameState(this);
    // const gameState = new GameState(this, players)

    // players.forEach((player) => gameState.addPlayer(player));
    // gameState.randomizeTurnOrder()

    // const data = gameState.getJSONObject();
    set(initRef, 1);
  }

  preload() {
    initializeApp(FIREBASE_CONFIG);

    const db = getDatabase();
    const roomId = Math.floor(new Date().getTime() / 10000);

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
        set(selfRef, playerId);

        onDisconnect(selfRef).remove();
      }
    });

    // Setting up game state ref
    onValue(initRef, (snapshot) => {
      const ss = snapshot.val();
      if (!ss) return;

      const data = { players: players, settings: null };
      console.log(players);
      this.scene.start('game', data);
    });
  }

  create() {
    const texts = [];

    onValue(playerRef, (snapshot) => {
      texts.forEach((text) => text.destroy());
      texts.length = 0;

      if (!snapshot.val()) return;

      console.log(snapshot.val());
      players = Object.keys(snapshot.val());

      players.forEach((player, i) => {
        const text = this.add
          .text(100, i * 100 + 100, [player])
          .setFontSize(32);
        texts.push(text);
      });
    });

    this.startButton = this.add
      .text(200, 300, ['START'])
      .setFontSize(32)
      .setInteractive();
    this.startButton.on('pointerdown', () => this.initGameState());
  }
}
