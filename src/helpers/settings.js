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
export const NUM_START_CARDS = 4;
export const NUM_FACEUP_CARDS = 5;
export const NUM_DEST_CARDS = 3;

export const COLOR_VALUES = {
  green: 12,
  yellow: 12,
  orange: 12,
  white: 12,
  black: 12,
  red: 12,
  blue: 12,
  pink: 12,
  wild: 14,
};

export const TRAIN_POINTS = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 10,
  6: 15,
};

export const ROUTES = [
  {
    id: 1,
    cities: ['ATL', 'CHA'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 2,
    cities: ['ATL', 'MIA'],
    length: 5,
    tracks: ['blue'],
  },
  {
    id: 3,
    cities: ['ATL', 'NAS'],
    length: 1,
    tracks: ['grey'],
  },
  {
    id: 4,
    cities: ['ATL', 'NO'],
    length: 4,
    tracks: ['yellow', 'orange'],
  },
  {
    id: 5,
    cities: ['ATL', 'RAL'],
    length: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 6,
    cities: ['BOS', 'MON'],
    length: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 7,
    cities: ['BOS', 'NY'],
    length: 2,
    tracks: ['yellow', 'red'],
  },
  {
    id: 8,
    cities: ['CAL', 'HEL'],
    length: 4,
    tracks: ['grey'],
  },
  {
    id: 9,
    cities: ['CAL', 'SEA'],
    length: 4,
    tracks: ['grey'],
  },
  {
    id: 10,
    cities: ['CAL', 'VAN'],
    length: 3,
    tracks: ['grey'],
  },
  {
    id: 11,
    cities: ['CAL', 'WIN'],
    length: 6,
    tracks: ['white'],
  },
  {
    id: 12,
    cities: ['CHA', 'MIA'],
    length: 4,
    tracks: ['pink'],
  },
  {
    id: 13,
    cities: ['CHA', 'RAL'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 14,
    cities: ['CHI', 'DUL'],
    length: 3,
    tracks: ['red'],
  },
  {
    id: 15,
    cities: ['CHI', 'OMA'],
    length: 4,
    tracks: ['blue'],
  },
  {
    id: 16,
    cities: ['CHI', 'PIT'],
    length: 3,
    tracks: ['orange', 'black'],
  },
  {
    id: 17,
    cities: ['CHI', 'STL'],
    length: 2,
    tracks: ['green', 'white'],
  },
  {
    id: 18,
    cities: ['CHI', 'TOR'],
    length: 4,
    tracks: ['white'],
  },
  {
    id: 19,
    cities: ['DAL', 'EP'],
    length: 4,
    tracks: ['red'],
  },
  {
    id: 20,
    cities: ['DAL', 'HOU'],
    length: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 21,
    cities: ['DAL', 'LR'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 22,
    cities: ['DAL', 'OKC'],
    length: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 23,
    cities: ['DEN', 'HEL'],
    length: 4,
    tracks: ['green'],
  },
  {
    id: 24,
    cities: ['DEN', 'KS'],
    length: 4,
    tracks: ['black', 'orange'],
  },
  {
    id: 25,
    cities: ['DEN', 'OKC'],
    length: 4,
    tracks: ['red'],
  },
  {
    id: 26,
    cities: ['DEN', 'OMA'],
    length: 4,
    tracks: ['pink'],
  },
  {
    id: 27,
    cities: ['DEN', 'PHX'],
    length: 5,
    tracks: ['white'],
  },
  {
    id: 28,
    cities: ['DEN', 'SFE'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 29,
    cities: ['DEN', 'SLC'],
    length: 3,
    tracks: ['red', 'yellow'],
  },
  {
    id: 30,
    cities: ['DUL', 'HEL'],
    length: 6,
    tracks: ['orange'],
  },
  {
    id: 31,
    cities: ['DUL', 'OMA'],
    length: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 32,
    cities: ['DUL', 'SSM'],
    length: 3,
    tracks: ['grey'],
  },
  {
    id: 33,
    cities: ['DUL', 'TOR'],
    length: 6,
    tracks: ['pink'],
  },
  {
    id: 34,
    cities: ['DUL', 'WIN'],
    length: 4,
    tracks: ['black'],
  },
  {
    id: 35,
    cities: ['EP', 'HOU'],
    length: 6,
    tracks: ['green'],
  },
  {
    id: 36,
    cities: ['EP', 'LA'],
    length: 6,
    tracks: ['black'],
  },
  {
    id: 37,
    cities: ['EP', 'OKC'],
    length: 5,
    tracks: ['yellow'],
  },
  {
    id: 38,
    cities: ['EP', 'PHX'],
    length: 3,
    tracks: ['grey'],
  },
  {
    id: 39,
    cities: ['EP', 'SFE'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 40,
    cities: ['HEL', 'OMA'],
    length: 5,
    tracks: ['red'],
  },
  {
    id: 41,
    cities: ['HEL', 'SEA'],
    length: 6,
    tracks: ['yellow'],
  },
  {
    id: 42,
    cities: ['HEL', 'SLC'],
    length: 3,
    tracks: ['pink'],
  },
  {
    id: 43,
    cities: ['HEL', 'WIN'],
    length: 4,
    tracks: ['blue'],
  },
  {
    id: 44,
    cities: ['HOU', 'NO'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 45,
    cities: ['KS', 'OKC'],
    length: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 46,
    cities: ['KS', 'OMA'],
    length: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 47,
    cities: ['KS', 'STL'],
    length: 2,
    tracks: ['blue', 'pink'],
  },
  {
    id: 48,
    cities: ['LA', 'PHX'],
    length: 3,
    tracks: ['grey'],
  },
  {
    id: 49,
    cities: ['LA', 'SF'],
    length: 3,
    tracks: ['pink', 'yellow'],
  },
  {
    id: 50,
    cities: ['LR', 'NAS'],
    length: 3,
    tracks: ['white'],
  },
  {
    id: 51,
    cities: ['LR', 'NO'],
    length: 3,
    tracks: ['green'],
  },
  {
    id: 52,
    cities: ['LR', 'OKC'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 53,
    cities: ['LR', 'STL'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 54,
    cities: ['LV', 'LA'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 55,
    cities: ['LV', 'SLC'],
    length: 3,
    tracks: ['orange'],
  },
  {
    id: 56,
    cities: ['MIA', 'NO'],
    length: 6,
    tracks: ['red'],
  },
  {
    id: 57,
    cities: ['MON', 'NY'],
    length: 3,
    tracks: ['blue'],
  },
  {
    id: 58,
    cities: ['MON', 'SSM'],
    length: 5,
    tracks: ['black'],
  },
  {
    id: 59,
    cities: ['MON', 'TOR'],
    length: 3,
    tracks: ['grey'],
  },
  {
    id: 60,
    cities: ['NAS', 'PIT'],
    length: 4,
    tracks: ['yellow'],
  },
  {
    id: 61,
    cities: ['NAS', 'RAL'],
    length: 3,
    tracks: ['black'],
  },
  {
    id: 62,
    cities: ['NAS', 'STL'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 63,
    cities: ['NY', 'PIT'],
    length: 2,
    tracks: ['white', 'green'],
  },
  {
    id: 64,
    cities: ['NY', 'WAS'],
    length: 2,
    tracks: ['orange', 'black'],
  },
  {
    id: 65,
    cities: ['OKC', 'SFE'],
    length: 3,
    tracks: ['blue'],
  },
  {
    id: 66,
    cities: ['PHX', 'SFE'],
    length: 3,
    tracks: ['grey'],
  },
  {
    id: 67,
    cities: ['PIT', 'RAL'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 68,
    cities: ['PIT', 'STL'],
    length: 5,
    tracks: ['green'],
  },
  {
    id: 69,
    cities: ['PIT', 'TOR'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 70,
    cities: ['PIT', 'WAS'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 71,
    cities: ['POR', 'SEA'],
    length: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 72,
    cities: ['POR', 'SF'],
    length: 5,
    tracks: ['green', 'pink'],
  },
  {
    id: 73,
    cities: ['POR', 'SLC'],
    length: 6,
    tracks: ['blue'],
  },
  {
    id: 74,
    cities: ['RAL', 'WAS'],
    length: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 75,
    cities: ['SEA', 'VAN'],
    length: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 76,
    cities: ['SLC', 'SF'],
    length: 5,
    tracks: ['orange', 'white'],
  },
  {
    id: 77,
    cities: ['SSM', 'TOR'],
    length: 2,
    tracks: ['grey'],
  },
  {
    id: 78,
    cities: ['SSM', 'WIN'],
    length: 6,
    tracks: ['grey'],
  },
];

export const DESTINATIONS = [
  {
    id: 1,
    cities: ['BOS', 'MIA'],
    points: 12
  },
  {
    id: 2,
    cities: ['CAL', 'PHX'],
    points: 13
  },
  {
    id: 3,
    cities: ['CAL', 'SLC'],
    points: 7
  },
  {
    id: 4,
    cities: ['CHI', 'NO'],
    points: 7
  },
  {
    id: 5,
    cities: ['CHI', 'SFE'],
    points: 9
  },
  {
    id: 6,
    cities: ['DAL', 'NY'],
    points: 11
  },
  {
    id: 7,
    cities: ['DEN', 'EP'],
    points: 4
  },
  {
    id: 8,
    cities: ['DEN', 'PIT'],
    points: 11
  },
  {
    id: 9,
    cities: ['DUL', 'EP'],
    points: 10
  },
  {
    id: 10,
    cities: ['DUL', 'HOU'],
    points: 8
  },
  {
    id: 11,
    cities: ['HEL', 'LA'],
    points: 8
  },
  {
    id: 12,
    cities: ['KS', 'HOU'],
    points: 5
  },
  {
    id: 13,
    cities: ['LA', 'CHI'],
    points: 16
  },
  {
    id: 14,
    cities: ['LA', 'MIA'],
    points: 20
  },
  {
    id: 15,
    cities: ['LA', 'NY'],
    points: 21
  },
  {
    id: 16,
    cities: ['MON', 'ATL'],
    points: 9
  },
  {
    id: 17,
    cities: ['MON', 'NO'],
    points: 13
  },
  {
    id: 18,
    cities: ['NY', 'ATL'],
    points: 6
  },
  {
    id: 19,
    cities: ['POR', 'NAS'],
    points: 17
  },
  {
    id: 20,
    cities: ['POR', 'PHX'],
    points: 11
  },
  {
    id: 21,
    cities: ['SF', 'ATL'],
    points: 17
  },
  {
    id: 22,
    cities: ['SSM', 'NAS'],
    points: 8
  },
  {
    id: 23,
    cities: ['SSM', 'OKC'],
    points: 9
  },
  {
    id: 24,
    cities: ['SEA', 'LA'],
    points: 9
  },
  {
    id: 25,
    cities: ['SEA', 'NY'],
    points: 22
  },
  {
    id: 26,
    cities: ['TOR', 'MIA'],
    points: 10
  },
  {
    id: 27,
    cities: ['VAN', 'MON'],
    points: 20
  },
  {
    id: 28,
    cities: ['VAN', 'SFE'],
    points: 13
  },
  {
    id: 29,
    cities: ['WIN', 'HOU'],
    points: 12
  },
  {
    id: 30,
    cities: ['WIN', 'LR'],
    points: 11
  }
];