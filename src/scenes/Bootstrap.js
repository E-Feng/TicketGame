import Phaser from 'phaser';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  onValue,
  onDisconnect,
} from 'firebase/database';

import { FIREBASE_CONFIG } from '../helpers/config';

let rootRef;
let initRef;
let eventRef;
let lobbyRef;
let playersRef;
let settingsRef;
let selfRef;

let isGameStarted;
let settings = 'base';
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
  }

  startGame = async () => {
    set(initRef, true);

    let events = [];

    if (!isGameStarted) {
      set(playersRef, players);
    } else {
      const res = await get(rootRef);
      const obj = res.val();

      players = obj.players;
      settings = obj.settings;
      events = Object.keys(obj.events).map((k) => {
        return {
          id: k,
          ...obj.events[k],
        };
      });
    }

    const data = {
      players: players,
      settings: settings,
      events: events,
    };
    console.log(data);

    this.scene.start('game', data);
  };

  async preload() {
    initializeApp(FIREBASE_CONFIG);

    const db = getDatabase();
    const roomId = this.game.roomId;
    console.log('Room ID:', roomId);

    rootRef = ref(db, `${roomId}/`);
    eventRef = ref(db, `${roomId}/events/`);
    playersRef = ref(db, `${roomId}/players/`);
    settingsRef = ref(db, `${roomId}/settings/`);
    lobbyRef = ref(db, `${roomId}/lobby/`);
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

        selfRef = ref(db, `${roomId}/lobby/${playerId}/`);
        set(selfRef, playerObj);

        onDisconnect(selfRef).remove();
      }
    });

    // Getting current game status
    const res = await get(initRef);
    isGameStarted = res.val();
  }

  create() {
    // Display name setting
    const htmlInput = `
      <input type="text" name="name" placeholder="Name" style="font-size: 48px">
      <input type="button" name="setButton" value="Set" style="font-size: 48px;"><br />
      `;
    const inputForm = this.add
      .dom(800, 200)
      .setOrigin(0)
      .createFromHTML(htmlInput);
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

    // Mode settings
    const htmlSettings = `
      <input type="radio" id="base" name="settings" value="base" style="height: 25px; width: 25px" checked>
      <label for="base" style="font-size: 48px">Base</label>
      <input type="radio" id="mega" name="settings" value="mega" style="height: 25px; width: 25px">
      <label for="mega" style="font-size: 48px">Mega</label>
    `;
    const optionsSelect = this.add
      .dom(800, 400)
      .setOrigin(0)
      .createFromHTML(htmlSettings);
    optionsSelect.addListener('click').on('click', (e) => {
      const setting = e.target.value;

      if (!isGameStarted && setting) {
        set(settingsRef, setting);
        settings = setting;
      }
    });

    onValue(settingsRef, (snapshot) => {
      const ss = snapshot.val();
      if (!ss) return;

      settings = ss;
      const button = optionsSelect.getChildByID(ss);
      button.checked = true;
    });

    // Setting up game state ref
    onValue(initRef, (snapshot) => {
      const ss = snapshot.val();
      if (!ss || !players) return;

      this.startGame();
    });

    // Setting up lobby/players ref
    const texts = this.add.container();
    onValue(lobbyRef, (snapshot) => {
      const ss = snapshot.val();
      if (!ss) return;

      texts.removeAll(true);

      players = Object.keys(ss).map((k) => {
        return {
          id: k,
          ...ss[k],
        };
      });
      players.forEach((player, i) => {
        const name = player.display || player.id;
        texts.add(
          this.add
            .text(100, i * 100 + 100, [name.slice(1, 20)])
            .setFill('black')
            .setFontSize(48)
        );
      });
    });

    this.startButton = this.add
      .text(200, 700, ['START'])
      .setFill('black')
      .setFontSize(48)
      .setInteractive();
    this.startButton.on('pointerdown', () => this.startGame());
  }
}
