const getFirebaseKey = async () => {
  if (import.meta.env.VITE_FIREBASE_KEY) {
    return import.meta.env.VITE_FIREBASE_KEY
  }

  const url = 'https://bmowiw89bd.execute-api.us-east-1.amazonaws.com/'
  const res = await fetch(url)
  const data = await res.text()

  return data
}

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
export const NUM_FACEUP_CARDS = 5;

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

export const ROUTES = [
  {
    id: 1,
    cities: ['ATL', 'CHA'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 2,
    cities: ['ATL', 'MIA'],
    number: 5,
    tracks: ['blue'],
  },
  {
    id: 3,
    cities: ['ATL', 'NAS'],
    number: 1,
    tracks: ['grey'],
  },
  {
    id: 4,
    cities: ['ATL', 'NO'],
    number: 4,
    tracks: ['yellow', 'orange'],
  },
  {
    id: 5,
    cities: ['ATL', 'RAL'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 6,
    cities: ['BOS', 'MON'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 7,
    cities: ['BOS', 'NY'],
    number: 2,
    tracks: ['yellow', 'red'],
  },
  {
    id: 8,
    cities: ['CAL', 'HEL'],
    number: 4,
    tracks: ['grey'],
  },
  {
    id: 9,
    cities: ['CAL', 'SEA'],
    number: 4,
    tracks: ['grey'],
  },
  {
    id: 10,
    cities: ['CAL', 'VAN'],
    number: 3,
    tracks: ['grey'],
  },
  {
    id: 11,
    cities: ['CAL', 'WIN'],
    number: 6,
    tracks: ['white'],
  },
  {
    id: 12,
    cities: ['CHA', 'MIA'],
    number: 4,
    tracks: ['pink'],
  },
  {
    id: 13,
    cities: ['CHA', 'RAL'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 14,
    cities: ['CHI', 'DUL'],
    number: 3,
    tracks: ['red'],
  },
  {
    id: 15,
    cities: ['CHI', 'OMA'],
    number: 4,
    tracks: ['blue'],
  },
  {
    id: 16,
    cities: ['CHI', 'PIT'],
    number: 3,
    tracks: ['orange', 'black'],
  },
  {
    id: 17,
    cities: ['CHI', 'STL'],
    number: 2,
    tracks: ['green', 'white'],
  },
  {
    id: 18,
    cities: ['CHI', 'TOR'],
    number: 4,
    tracks: ['white'],
  },
  {
    id: 19,
    cities: ['DAL', 'EP'],
    number: 4,
    tracks: ['red'],
  },
  {
    id: 20,
    cities: ['DAL', 'HOU'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 21,
    cities: ['DAL', 'LR'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 22,
    cities: ['DAL', 'OKC'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 23,
    cities: ['DEN', 'HEL'],
    number: 4,
    tracks: ['green'],
  },
  {
    id: 24,
    cities: ['DEN', 'KS'],
    number: 4,
    tracks: ['black', 'orange'],
  },
  {
    id: 25,
    cities: ['DEN', 'OKC'],
    number: 4,
    tracks: ['red'],
  },
  {
    id: 26,
    cities: ['DEN', 'OMA'],
    number: 4,
    tracks: ['pink'],
  },
  {
    id: 27,
    cities: ['DEN', 'PHX'],
    number: 5,
    tracks: ['white'],
  },
  {
    id: 28,
    cities: ['DEN', 'SFE'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 29,
    cities: ['DEN', 'SLC'],
    number: 3,
    tracks: ['red', 'yellow'],
  },
  {
    id: 30,
    cities: ['DUL', 'HEL'],
    number: 6,
    tracks: ['orange'],
  },
  {
    id: 31,
    cities: ['DUL', 'OMA'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 32,
    cities: ['DUL', 'SSM'],
    number: 3,
    tracks: ['grey'],
  },
  {
    id: 33,
    cities: ['DUL', 'TOR'],
    number: 6,
    tracks: ['pink'],
  },
  {
    id: 34,
    cities: ['DUL', 'WIN'],
    number: 4,
    tracks: ['black'],
  },
  {
    id: 35,
    cities: ['EP', 'HOU'],
    number: 6,
    tracks: ['green'],
  },
  {
    id: 36,
    cities: ['EP', 'LA'],
    number: 6,
    tracks: ['black'],
  },
  {
    id: 37,
    cities: ['EP', 'OKC'],
    number: 5,
    tracks: ['yellow'],
  },
  {
    id: 38,
    cities: ['EP', 'PHX'],
    number: 3,
    tracks: ['grey'],
  },
  {
    id: 39,
    cities: ['EP', 'SFE'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 40,
    cities: ['HEL', 'OMA'],
    number: 5,
    tracks: ['red'],
  },
  {
    id: 41,
    cities: ['HEL', 'SEA'],
    number: 6,
    tracks: ['yellow'],
  },
  {
    id: 42,
    cities: ['HEL', 'SLC'],
    number: 3,
    tracks: ['pink'],
  },
  {
    id: 43,
    cities: ['HEL', 'WIN'],
    number: 4,
    tracks: ['blue'],
  },
  {
    id: 44,
    cities: ['HOU', 'NO'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 45,
    cities: ['KS', 'OKC'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 46,
    cities: ['KS', 'OMA'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 47,
    cities: ['KS', 'STL'],
    number: 2,
    tracks: ['blue', 'pink'],
  },
  {
    id: 48,
    cities: ['LA', 'PHX'],
    number: 3,
    tracks: ['grey'],
  },
  {
    id: 49,
    cities: ['LA', 'SF'],
    number: 3,
    tracks: ['pink', 'yellow'],
  },
  {
    id: 50,
    cities: ['LR', 'NAS'],
    number: 3,
    tracks: ['white'],
  },
  {
    id: 51,
    cities: ['LR', 'NO'],
    number: 3,
    tracks: ['green'],
  },
  {
    id: 52,
    cities: ['LR', 'OKC'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 53,
    cities: ['LR', 'STL'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 54,
    cities: ['LV', 'LA'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 55,
    cities: ['LV', 'SLC'],
    number: 3,
    tracks: ['orange'],
  },
  {
    id: 56,
    cities: ['MIA', 'NO'],
    number: 6,
    tracks: ['red'],
  },
  {
    id: 57,
    cities: ['MON', 'NY'],
    number: 3,
    tracks: ['blue'],
  },
  {
    id: 58,
    cities: ['MON', 'SSM'],
    number: 5,
    tracks: ['black'],
  },
  {
    id: 59,
    cities: ['MON', 'TOR'],
    number: 3,
    tracks: ['grey'],
  },
  {
    id: 60,
    cities: ['NAS', 'PIT'],
    number: 4,
    tracks: ['yellow'],
  },
  {
    id: 61,
    cities: ['NAS', 'RAL'],
    number: 3,
    tracks: ['black'],
  },
  {
    id: 62,
    cities: ['NAS', 'STL'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 63,
    cities: ['NY', 'PIT'],
    number: 2,
    tracks: ['white', 'green'],
  },
  {
    id: 64,
    cities: ['NY', 'WAS'],
    number: 2,
    tracks: ['orange', 'black'],
  },
  {
    id: 65,
    cities: ['OKC', 'SFE'],
    number: 3,
    tracks: ['blue'],
  },
  {
    id: 66,
    cities: ['PHX', 'SFE'],
    number: 3,
    tracks: ['grey'],
  },
  {
    id: 67,
    cities: ['PIT', 'RAL'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 68,
    cities: ['PIT', 'STL'],
    number: 5,
    tracks: ['green'],
  },
  {
    id: 69,
    cities: ['PIT', 'TOR'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 70,
    cities: ['PIT', 'WAS'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 71,
    cities: ['POR', 'SEA'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 72,
    cities: ['POR', 'SF'],
    number: 5,
    tracks: ['green', 'pink'],
  },
  {
    id: 73,
    cities: ['POR', 'SLC'],
    number: 6,
    tracks: ['blue'],
  },
  {
    id: 74,
    cities: ['RAL', 'WAS'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    id: 75,
    cities: ['SEA', 'VAN'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
  {
    id: 76,
    cities: ['SLC', 'SF'],
    number: 5,
    tracks: ['orange', 'white'],
  },
  {
    id: 77,
    cities: ['SSM', 'TOR'],
    number: 2,
    tracks: ['grey'],
  },
  {
    id: 78,
    cities: ['SSM', 'WIN'],
    number: 6,
    tracks: ['grey'],
  },
];