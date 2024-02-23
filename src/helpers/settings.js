export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
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

export const CITIES = [
  {
    id: 1,
    code: 'ATL',
    display: 'ATLANTA',
  },
  {
    id: 2,
    code: 'BOS',
    display: 'BOSTON',
  },
  {
    id: 3,
    code: 'CLG',
    display: 'CALGARY',
  },
  {
    id: 4,
    code: 'CHA',
    display: 'CHARLESTON',
  },
  {
    id: 5,
    code: 'CHI',
    display: 'CHICAGO',
  },
  {
    id: 6,
    code: 'DAL',
    display: 'DALLAS',
  },
  {
    id: 7,
    code: 'DEN',
    display: 'DENVER',
  },
  {
    id: 8,
    code: 'DUL',
    display: 'DULUTH',
  },
  {
    id: 9,
    code: 'ELP',
    display: 'EL PASO',
  },
  {
    id: 10,
    code: 'HEL',
    display: 'HELENA',
  },
  {
    id: 11,
    code: 'HOU',
    display: 'HOUSTON',
  },
  {
    id: 12,
    code: 'KS',
    display: 'KANSAS CITY',
  },
  {
    id: 13,
    code: 'LV',
    display: 'LAS VEGAS',
  },
  {
    id: 14,
    code: 'LR',
    display: 'LITTLEROCK',
  },
  {
    id: 15,
    code: 'LA',
    display: 'LOS ANGELES',
  },
  {
    id: 16,
    code: 'MIA',
    display: 'MIAMI',
  },
  {
    id: 17,
    code: 'MON',
    display: 'MONTREAL',
  },
  {
    id: 18,
    code: 'NAS',
    display: 'NASHVILLE',
  },
  {
    id: 19,
    code: 'NO',
    display: 'NEW ORLEANS',
  },
  {
    id: 20,
    code: 'NY',
    display: 'NEW YORK',
  },
  {
    id: 21,
    code: 'OKC',
    display: 'OKLAHOMA CITY',
  },
  {
    id: 22,
    code: 'OMA',
    display: 'OMAHA',
  },
  {
    id: 23,
    code: 'PHX',
    display: 'PHOENIX',
  },
  {
    id: 24,
    code: 'PIT',
    display: 'PITTSBURGH',
  },
  {
    id: 25,
    code: 'POR',
    display: 'PORTLAND',
  },
  {
    id: 26,
    code: 'RAL',
    display: 'RALEIGH',
  },
  {
    id: 27,
    code: 'SLC',
    display: 'SALT LAKE CITY',
  },
  {
    id: 28,
    code: 'SF',
    display: 'SAN FRANCISCO',
  },
  {
    id: 29,
    code: 'SFE',
    display: 'SANTA FE',
  },
  {
    id: 30,
    code: 'SSM',
    display: 'SAULT ST MARIE',
  },
  {
    id: 31,
    code: 'SEA',
    display: 'SEATTLE',
  },
  {
    id: 32,
    code: 'TOR',
    display: 'TORONTO',
  },
  {
    id: 33,
    code: 'VAN',
    display: 'VANCOUVER',
  },
  {
    id: 34,
    code: 'WAS',
    display: 'WASHINGTON',
  },
  {
    id: 35,
    code: 'WIN',
    display: 'WINNIPEG',
  },
];

export const ROUTES = [
  {
    id: 1,
    cities: ['ATLANTA', 'CHARLESTON'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['ATLANTA', 'RALEIGH'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['ATLANTA', 'MIAMI'],
    number: 5,
    tracks: ['blue'],
  },
  {
    cities: ['ATLANTA', 'NASHVILLE'],
    number: 1,
    tracks: ['grey'],
  },
  {
    cities: ['ATLANTA', 'NO'],
    number: 4,
    tracks: ['yellow', 'orange'],
  },
  {
    cities: ['BOSTON', 'MONTREAL'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['BOSTON', 'NY'],
    number: 2,
    tracks: ['yellow', 'red'],
  },
  {
    cities: ['CALGARY', 'HELENA'],
    number: 4,
    tracks: ['grey'],
  },
  {
    cities: ['CALGARY', 'SEATTLE'],
    number: 4,
    tracks: ['grey'],
  },
  {
    cities: ['CALGARY', 'VANCOUVER'],
    number: 3,
    tracks: ['grey'],
  },
  {
    cities: ['CALGARY', 'WINNIPEG'],
    number: 6,
    tracks: ['white'],
  },
  {
    cities: ['CHARLESTON', 'MIAMI'],
    number: 4,
    tracks: ['pink'],
  },
  {
    cities: ['CHARLESTON', 'RALEIGH'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['CHICAGO', 'DULUTH'],
    number: 3,
    tracks: ['red'],
  },
  {
    cities: ['CHICAGO', 'OMAHA'],
    number: 4,
    tracks: ['blue'],
  },
  {
    cities: ['CHICAGO', 'PITTSBURGH'],
    number: 3,
    tracks: ['orange', 'black'],
  },
  {
    cities: ['CHICAGO', 'STL'],
    number: 2,
    tracks: ['green', 'white'],
  },
  {
    cities: ['CHICAGO', 'TORONTO'],
    number: 4,
    tracks: ['white'],
  },
  {
    cities: ['DALLAS', 'ELPASO'],
    number: 4,
    tracks: ['red'],
  },
  {
    cities: ['DALLAS', 'HOUSTON'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['DALLAS', 'LITTLEROCK'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['DALLAS', 'OKC'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['DENVER', 'HELENA'],
    number: 4,
    tracks: ['green'],
  },
  {
    cities: ['DENVER', 'KS'],
    number: 4,
    tracks: ['black', 'orange'],
  },
  {
    cities: ['DENVER', 'OKC'],
    number: 4,
    tracks: ['red'],
  },
  {
    cities: ['DENVER', 'OMAHA'],
    number: 4,
    tracks: ['pink'],
  },
  {
    cities: ['DENVER', 'PHX'],
    number: 5,
    tracks: ['white'],
  },
  {
    cities: ['DENVER', 'SLC'],
    number: 3,
    tracks: ['red', 'yellow'],
  },
  {
    cities: ['DENVER', 'SANTAFE'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['DULUTH', 'HELENA'],
    number: 6,
    tracks: ['orange'],
  },
  {
    cities: ['DULUTH', 'OMAHA'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['DULUTH', 'SSM'],
    number: 3,
    tracks: ['grey'],
  },
  {
    cities: ['DULUTH', 'TORONTO'],
    number: 6,
    tracks: ['pink'],
  },
  {
    cities: ['DULUTH', 'WINNIPEG'],
    number: 4,
    tracks: ['black'],
  },
  {
    cities: ['ELPASO', 'HOUSTON'],
    number: 6,
    tracks: ['green'],
  },
  {
    cities: ['ELPASO', 'LA'],
    number: 6,
    tracks: ['black'],
  },
  {
    cities: ['ELPASO', 'OKC'],
    number: 5,
    tracks: ['yellow'],
  },
  {
    cities: ['ELPASO', 'PHX'],
    number: 3,
    tracks: ['grey'],
  },
  {
    cities: ['ELPASO', 'SANTAFE'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['HELENA', 'OMAHA'],
    number: 5,
    tracks: ['red'],
  },
  {
    cities: ['HELENA', 'SLC'],
    number: 3,
    tracks: ['pink'],
  },
  {
    cities: ['HELENA', 'SEATTLE'],
    number: 6,
    tracks: ['yellow'],
  },
  {
    cities: ['HELENA', 'WINNIPEG'],
    number: 4,
    tracks: ['blue'],
  },
  {
    cities: ['HOUSTON', 'NO'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['KS', 'OKC'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['KS', 'OMAHA'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['KS', 'STL'],
    number: 2,
    tracks: ['blue', 'pink'],
  },
  {
    cities: ['LV', 'LA'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['LV', 'SLC'],
    number: 3,
    tracks: ['orange'],
  },
  {
    cities: ['LITTLEROCK', 'NASHVILLE'],
    number: 3,
    tracks: ['white'],
  },
  {
    cities: ['LITTLEROCK', 'NO'],
    number: 3,
    tracks: ['green'],
  },
  {
    cities: ['LITTLEROCK', 'OKC'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['LITTLEROCK', 'STL'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['LA', 'PHX'],
    number: 3,
    tracks: ['grey'],
  },
  {
    cities: ['LA', 'SF'],
    number: 3,
    tracks: ['pink', 'yellow'],
  },
  {
    cities: ['HELENA', 'OMAHA'],
    number: 5,
    tracks: ['red'],
  },
  {
    cities: ['MIAMI', 'NO'],
    number: 6,
    tracks: ['red'],
  },
  {
    cities: ['MONTREAL', 'NY'],
    number: 3,
    tracks: ['blue'],
  },
  {
    cities: ['MONTREAL', 'SSM'],
    number: 5,
    tracks: ['black'],
  },
  {
    cities: ['MONTREAL', 'TORONTO'],
    number: 3,
    tracks: ['grey'],
  },
  {
    cities: ['NASHVILLE', 'PITTSBURGH'],
    number: 4,
    tracks: ['yellow'],
  },
  {
    cities: ['NASHVILLE', 'RALEIGH'],
    number: 3,
    tracks: ['black'],
  },
  {
    cities: ['NASHVILLE', 'STL'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['NY', 'PITTSBURGH'],
    number: 2,
    tracks: ['white', 'green'],
  },
  {
    cities: ['NY', 'WASHINGTON'],
    number: 2,
    tracks: ['orange', 'black'],
  },
  {
    cities: ['OKC', 'SANTAFE'],
    number: 3,
    tracks: ['blue'],
  },
  {
    cities: ['PHX', 'SANTAFE'],
    number: 3,
    tracks: ['grey'],
  },
  {
    cities: ['PITTSBURGH', 'RALEIGH'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['PITTSBURGH', 'STL'],
    number: 5,
    tracks: ['green'],
  },
  {
    cities: ['PITTSBURGH', 'TORONTO'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['PITTSBURGH', 'WASHINGTON'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['PORTLAND', 'SLC'],
    number: 6,
    tracks: ['blue'],
  },
  {
    cities: ['PORTLAND', 'SF'],
    number: 5,
    tracks: ['green', 'pink'],
  },
  {
    cities: ['PORTLAND', 'SEATTLE'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['RALEIGH', 'WASHINGTON'],
    number: 2,
    tracks: ['grey', 'grey'],
  },
  {
    cities: ['SLC', 'SF'],
    number: 5,
    tracks: ['orange', 'white'],
  },
  {
    cities: ['SSM', 'TORONTO'],
    number: 2,
    tracks: ['grey'],
  },
  {
    cities: ['SSM', 'WINNIPEG'],
    number: 6,
    tracks: ['grey'],
  },
  {
    cities: ['SEATTLE', 'VANCOUVER'],
    number: 1,
    tracks: ['grey', 'grey'],
  },
];
