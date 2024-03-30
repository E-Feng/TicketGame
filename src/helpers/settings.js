const getFirebaseKey = async () => {
  if (import.meta.env.VITE_FIREBASE_KEY) {
    return import.meta.env.VITE_FIREBASE_KEY;
  }

  const url = 'https://bmowiw89bd.execute-api.us-east-1.amazonaws.com/';
  const res = await fetch(url);
  const data = await res.text();

  return data;
};

export const FIREBASE_CONFIG = {
  apiKey: await getFirebaseKey(),
  authDomain: 'ticketgame-ffc51.firebaseapp.com',
  databaseURL: 'https://ticketgame-ffc51-default-rtdb.firebaseio.com',
  projectId: 'ticketgame-ffc51',
  storageBucket: 'ticketgame-ffc51.appspot.com',
  messagingSenderId: '408380915939',
  appId: '1:408380915939:web:5858627260db04475445d6',
};

export const NUM_MAX_PLAYERS = 5;
export const NUM_TRAINS = 45;
export const NUM_TRAINS_END = 2;
export const NUM_START_CARDS = 4;
export const NUM_FACEUP_CARDS = 5;
export const NUM_DRAW_DEST_CARDS = [3, 3];
export const NUM_KEEP_DEST_CARDS = [2, 1];

export const TRAIN_COLORS_SETUP = [
  { color: 'green', number: 12 },
  { color: 'yellow', number: 12 },
  { color: 'orange', number: 12 },
  { color: 'white', number: 12 },
  { color: 'black', number: 12 },
  { color: 'red', number: 12 },
  { color: 'blue', number: 12 },
  { color: 'pink', number: 12 },
  { color: 'wild', number: 14 },
];

export const TRAIN_POINTS = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 10,
  6: 15,
};
