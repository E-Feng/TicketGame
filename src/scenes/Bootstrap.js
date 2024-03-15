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
let playerObj;

export const sendEventToFirebase = (event) => {
  push(eventRef, event);
};

export const initEventsListener = (gameState) => {
  onValue(eventRef, (snapshot) => {
    if (!snapshot.val()) return;

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
  });
};

export default class Bootstrap extends Phaser.Scene {
  constructor() {
    super('bootstrap');
    // console.log(this.game.roomId)
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
    const roomId = this.game.roomId || Math.floor(new Date().getTime() / 10000);

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

        playerObj = {
          id: playerId,
          display: '',
        };

        selfRef = ref(db, `${roomId}/players/${playerId}/`);
        set(selfRef, playerObj);

        onDisconnect(selfRef).remove();
      }
    });

    // Setting up game state ref
    onValue(initRef, (snapshot) => {
      const ss = snapshot.val();
      if (!ss) return;

      const data = { players: players, settings: null };

      this.scene.start('game', data);
    });
  }

  create() {
    const texts = [];

    const htmlInput = `
      <input type="text" name="name" placeholder="Name" style="font-size: 32px">
      <input type="button" name="setButton" value="Set" style="font-size: 32px"><br />
      `;
    const inputForm = this.add.dom(1000, 200).createFromHTML(htmlInput);
    inputForm.addListener('click').on('click', (e) => {
      if (e.target.name === 'setButton') {
        const displayName = inputForm.getChildByName('name').value;

        if (displayName !== '') {
          const playerId = localStorage.getItem('uid');
          playerObj = {
            display: displayName,
            id: playerId,
          };
          set(selfRef, playerObj);
        }
      }
    });

    onValue(playerRef, (snapshot) => {
      const ss = snapshot.val();
      if (!ss) return;

      texts.forEach((text) => text.destroy());
      texts.length = 0;

      players = Object.keys(ss).map(k => {
        return {
          id: k,
          display: ss[k].display
        }
      });

      players.forEach((player, i) => {
        const name = player.display || player.id
        const text = this.add
          .text(100, i * 100 + 100, [name])
          .setFontSize(32);
        texts.push(text);

        // this.initGameState()
      });
    });

    this.startButton = this.add
      .text(200, 500, ['START'])
      .setFontSize(32)
      .setInteractive();
    this.startButton.on('pointerdown', () => this.initGameState());
  }
}
