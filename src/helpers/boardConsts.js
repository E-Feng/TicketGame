export const mapX = 120;
export const mapY = 0;
export const mapScale = 0.7;

const correctMapCoords = (coords) => {
  const offtags = [mapX, mapY];
  return coords.map((c, i) => c * mapScale + offtags[i]);
};

export const CITIES = [
  { id: 'ATL', coords: [1520, 787], display: 'Atlanta' },
  { id: 'BOS', coords: [1857, 205], display: 'Boston' },
  { id: 'CAL', coords: [403, 97], display: 'Calgary' },
  { id: 'CHA', coords: [1708, 801], display: 'Charlotte' },
  { id: 'CHI', coords: [1322, 475], display: 'Chicago' },
  { id: 'DAL', coords: [1058, 988], display: 'Dallas' },
  { id: 'DEN', coords: [721, 673], display: 'Denver' },
  { id: 'DUL', coords: [1078, 351], display: 'Duluth' },
  { id: 'EP', coords: [696, 1035], display: 'El Paso' },
  { id: 'HEL', coords: [603, 361], display: 'Helena' },
  { id: 'HOU', coords: [1139, 1066], display: 'Houston' },
  { id: 'KS', coords: [1058, 638], display: 'Kansas' },
  { id: 'LV', coords: [348, 830], display: 'Las Vegas' },
  { id: 'LR', coords: [1199, 819], display: 'Little Rock' },
  { id: 'LA', coords: [218, 947], display: 'Los Angeles' },
  { id: 'MIA', coords: [1773, 1116], display: 'Miami' },
  { id: 'MON', coords: [1717, 87], display: 'Montreal' },
  { id: 'NAS', coords: [1418, 716], display: 'Nashville' },
  { id: 'NO', coords: [1327, 1042], display: 'New Orleans' },
  { id: 'NY', coords: [1753, 355], display: 'New York' },
  { id: 'OKC', coords: [1018, 812], display: 'Oklahoma City' },
  { id: 'OMA', coords: [1015, 536], display: 'Omaha' },
  { id: 'PHX', coords: [458, 960], display: 'Phoenix' },
  { id: 'PIT', coords: [1583, 445], display: 'Pittsburgh' },
  { id: 'POR', coords: [93, 343], display: 'Portland' },
  { id: 'RAL', coords: [1652, 670], display: 'Raleigh' },
  { id: 'STL', coords: [1231, 641], display: 'St. Louis' },
  { id: 'SLC', coords: [461, 609], display: 'Salt Lake City' },
  { id: 'SF', coords: [64, 737], display: 'San Francisco' },
  { id: 'SFE', coords: [707, 854], display: 'Santa Fe' },
  { id: 'SSM', coords: [1332, 218], display: 'Sault St. Marie' },
  { id: 'SEA', coords: [134, 234], display: 'Seattle' },
  { id: 'TOR', coords: [1550, 262], display: 'Toronto' },
  { id: 'VAN', coords: [141, 131], display: 'Vancouver' },
  { id: 'WAS', coords: [1769, 535], display: 'Washington' },
  { id: 'WIN', coords: [852, 120], display: 'Winnipeg' },
].map((city) => {
  return {
    ...city,
    coords: correctMapCoords(city.coords),
  };
});

export const ROUTES = [
  {
    id: 1,
    cities: ['ATL', 'CHA'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1584, 808],
      [1659, 812],
    ],
  },
  {
    id: 2,
    cities: ['ATL', 'MIA'],
    length: 5,
    tracks: ['blue'],
    coords: [
      [1553, 847],
      [1597, 902],
      [1643, 960],
      [1688, 1016],
      [1735, 1072],
    ],
  },
  {
    id: 3,
    cities: ['ATL', 'NAS'],
    length: 1,
    tracks: ['grey'],
    coords: [[1466, 749]],
  },
  {
    id: 4,
    cities: ['ATL', 'NO'],
    length: 4,
    tracks: ['yellow', 'orange'],
    coords: [
      [1346, 988],
      [1378, 924],
      [1423, 865],
      [1472, 814],
      [1365, 1005],
      [1398, 944],
      [1442, 885],
      [1490, 832],
    ],
  },
  {
    id: 5,
    cities: ['ATL', 'RAL'],
    length: 2,
    tracks: ['grey', 'grey'],
    coords: [
      [1554, 742],
      [1605, 696],
      [1571, 763],
      [1622, 716],
    ],
  },
  {
    id: 6,
    cities: ['BOS', 'MON'],
    length: 2,
    tracks: ['grey', 'grey'],
    coords: [
      [1752, 134],
      [1808, 178],
      [1769, 114],
      [1824, 158],
    ],
  },
  {
    id: 7,
    cities: ['BOS', 'NY'],
    length: 2,
    tracks: ['yellow', 'red'],
    coords: [
      [1786, 311],
      [1822, 249],
      [1804, 325],
      [1841, 266],
    ],
  },
  {
    id: 8,
    cities: ['CAL', 'HEL'],
    length: 4,
    tracks: ['grey'],
    coords: [
      [444, 146],
      [489, 202],
      [535, 257],
      [581, 312],
    ],
  },
  {
    id: 9,
    cities: ['CAL', 'SEA'],
    length: 4,
    tracks: ['grey'],
    coords: [
      [383, 154],
      [337, 210],
      [269, 236],
      [197, 240],
    ],
  },
  {
    id: 10,
    cities: ['CAL', 'VAN'],
    length: 3,
    tracks: ['grey'],
    coords: [
      [201, 119],
      [276, 111],
      [347, 103],
    ],
  },
  {
    id: 11,
    cities: ['CAL', 'WIN'],
    length: 6,
    tracks: ['white'],
    coords: [
      [460, 78],
      [527, 58],
      [600, 47],
      [673, 49],
      [743, 63],
      [810, 87],
    ],
  },
  {
    id: 12,
    cities: ['CHA', 'MIA'],
    length: 4,
    tracks: ['pink'],
    coords: [
      [1712, 854],
      [1719, 927],
      [1736, 999],
      [1763, 1063],
    ],
  },
  {
    id: 13,
    cities: ['CHA', 'RAL'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1729, 754],
      [1695, 703],
    ],
  },
  {
    id: 14,
    cities: ['CHI', 'DUL'],
    length: 3,
    tracks: ['red'],
    coords: [
      [1257, 437],
      [1187, 416],
      [1124, 386],
    ],
  },
  {
    id: 15,
    cities: ['CHI', 'OMA'],
    length: 4,
    tracks: ['blue'],
    coords: [
      [1266, 470],
      [1199, 460],
      [1125, 475],
      [1067, 516],
    ],
  },
  {
    id: 16,
    cities: ['CHI', 'PIT'],
    length: 3,
    tracks: ['orange', 'black'],
    coords: [
      [1371, 435],
      [1444, 422],
      [1516, 418],
      [1380, 461],
      [1453, 447],
      [1523, 443],
    ],
  },
  {
    id: 17,
    cities: ['CHI', 'STL'],
    length: 2,
    tracks: ['green', 'white'],
    coords: [
      [1277, 520],
      [1238, 581],
      [1297, 534],
      [1258, 595],
    ],
  },
  {
    id: 18,
    cities: ['CHI', 'TOR'],
    length: 4,
    tracks: ['white'],
    coords: [
      [1333, 418],
      [1390, 367],
      [1455, 335],
      [1519, 305],
    ],
  },
  {
    id: 19,
    cities: ['DAL', 'EP'],
    length: 4,
    tracks: ['red'],
    coords: [
      [1001, 1002],
      [929, 1013],
      [857, 1023],
      [788, 1035],
    ],
  },
  {
    id: 20,
    cities: ['DAL', 'HOU'],
    length: 1,
    tracks: ['grey', 'grey'],
    coords: [
      [1106, 1013],
      [1088, 1031],
    ],
  },
  {
    id: 21,
    cities: ['DAL', 'LR'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1113, 921],
      [1153, 865],
    ],
  },
  {
    id: 22,
    cities: ['DAL', 'OKC'],
    length: 2,
    tracks: ['grey', 'grey'],
    coords: [
      [1030, 863],
      [1040, 935],
      [1054, 860],
      [1063, 931],
    ],
  },
  {
    id: 23,
    cities: ['DEN', 'HEL'],
    length: 4,
    tracks: ['green'],
    coords: [
      [708, 609],
      [682, 547],
      [655, 478],
      [628, 412],
    ],
  },
  {
    id: 24,
    cities: ['DEN', 'KS'],
    length: 4,
    tracks: ['black', 'orange'],
    coords: [
      [790, 673],
      [862, 673],
      [930, 664],
      [1002, 644],
      [792, 700],
      [864, 700],
      [936, 690],
      [1002, 668],
    ],
  },
  {
    id: 25,
    cities: ['DEN', 'OKC'],
    length: 4,
    tracks: ['red'],
    coords: [
      [756, 730],
      [816, 772],
      [888, 792],
      [957, 800],
    ],
  },
  {
    id: 26,
    cities: ['DEN', 'OMA'],
    length: 4,
    tracks: ['pink'],
    coords: [
      [762, 630],
      [826, 591],
      [892, 566],
      [962, 550],
    ],
  },
  {
    id: 27,
    cities: ['DEN', 'PHX'],
    length: 5,
    tracks: ['white'],
    coords: [
      [662, 695],
      [599, 731],
      [547, 787],
      [511, 846],
      [480, 910],
    ],
  },
  {
    id: 28,
    cities: ['DEN', 'SFE'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [710, 732],
      [707, 801],
    ],
  },
  {
    id: 29,
    cities: ['DEN', 'SLC'],
    length: 3,
    tracks: ['red', 'yellow'],
    coords: [
      [520, 605],
      [591, 618],
      [658, 633],
      [516, 629],
      [586, 641],
      [656, 654],
    ],
  },
  {
    id: 30,
    cities: ['DUL', 'HEL'],
    length: 6,
    tracks: ['orange'],
    coords: [
      [1024, 355],
      [952, 356],
      [882, 358],
      [810, 358],
      [735, 359],
      [664, 361],
    ],
  },
  {
    id: 31,
    cities: ['DUL', 'OMA'],
    length: 2,
    tracks: ['grey', 'grey'],
    coords: [
      [1046, 409],
      [1020, 475],
      [1068, 418],
      [1042, 485],
    ],
  },
  {
    id: 32,
    cities: ['DUL', 'SSM'],
    length: 3,
    tracks: ['grey'],
    coords: [
      [1147, 304],
      [1209, 278],
      [1278, 249],
    ],
  },
  {
    id: 33,
    cities: ['DUL', 'TOR'],
    length: 6,
    tracks: ['pink'],
    coords: [
      [1134, 342],
      [1205, 330],
      [1275, 318],
      [1348, 304],
      [1419, 292],
      [1488, 280],
    ],
  },
  {
    id: 34,
    cities: ['DUL', 'WIN'],
    length: 4,
    tracks: ['black'],
    coords: [
      [1045, 310],
      [993, 260],
      [940, 208],
      [887, 158],
    ],
  },
  {
    id: 35,
    cities: ['EP', 'HOU'],
    length: 6,
    tracks: ['green'],
    coords: [
      [742, 1068],
      [808, 1096],
      [876, 1112],
      [950, 1120],
      [1022, 1114],
      [1090, 1096],
    ],
  },
  {
    id: 36,
    cities: ['EP', 'LA'],
    length: 6,
    tracks: ['black'],
    coords: [
      [616, 1050],
      [544, 1061],
      [469, 1058],
      [400, 1044],
      [334, 1020],
      [272, 984],
    ],
  },
  {
    id: 37,
    cities: ['EP', 'OKC'],
    length: 5,
    tracks: ['yellow'],
    coords: [
      [751, 1012],
      [817, 986],
      [883, 952],
      [937, 904],
      [982, 850],
    ],
  },
  {
    id: 38,
    cities: ['EP', 'PHX'],
    length: 3,
    tracks: ['grey'],
    coords: [
      [648, 1018],
      [578, 997],
      [509, 977],
    ],
  },
  {
    id: 39,
    cities: ['EP', 'SFE'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [698, 979],
      [700, 907],
    ],
  },
  {
    id: 40,
    cities: ['HEL', 'OMA'],
    length: 5,
    tracks: ['red'],
    coords: [
      [681, 399],
      [749, 427],
      [815, 453],
      [881, 481],
      [949, 509],
    ],
  },
  {
    id: 41,
    cities: ['HEL', 'SEA'],
    length: 6,
    tracks: ['yellow'],
    coords: [
      [546, 356],
      [474, 340],
      [404, 325],
      [333, 310],
      [262, 293],
      [194, 278],
    ],
  },
  {
    id: 42,
    cities: ['HEL', 'SLC'],
    length: 3,
    tracks: ['pink'],
    coords: [
      [571, 417],
      [534, 478],
      [498, 542],
    ],
  },
  {
    id: 43,
    cities: ['HEL', 'WIN'],
    length: 4,
    tracks: ['blue'],
    coords: [
      [653, 311],
      [703, 262],
      [756, 210],
      [806, 159],
    ],
  },
  {
    id: 44,
    cities: ['HOU', 'NO'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1197, 1058],
      [1272, 1046],
    ],
  },
  {
    id: 45,
    cities: ['KS', 'OKC'],
    length: 2,
    tracks: ['grey', 'grey'],
    coords: [
      [1043, 688],
      [1024, 757],
      [1069, 696],
      [1049, 763],
    ],
  },
  {
    id: 46,
    cities: ['KS', 'OMA'],
    length: 1,
    tracks: ['grey', 'grey'],
    coords: [
      [1033, 592],
      [1057, 583],
    ],
  },
  {
    id: 47,
    cities: ['KS', 'STL'],
    length: 2,
    tracks: ['blue', 'pink'],
    coords: [
      [1110, 623],
      [1184, 620],
      [1113, 647],
      [1185, 643],
    ],
  },
  {
    id: 48,
    cities: ['LA', 'PHX'],
    length: 3,
    tracks: ['grey'],
    coords: [
      [270, 929],
      [343, 926],
      [413, 934],
    ],
  },
  {
    id: 49,
    cities: ['LA', 'SF'],
    length: 3,
    tracks: ['yellow', 'pink'],
    coords: [
      [81, 796],
      [117, 862],
      [160, 916],
      [102, 783],
      [136, 845],
      [181, 902],
    ],
  },
  {
    id: 50,
    cities: ['LR', 'NAS'],
    length: 3,
    tracks: ['white'],
    coords: [
      [1251, 811],
      [1323, 794],
      [1383, 756],
    ],
  },
  {
    id: 51,
    cities: ['LR', 'NO'],
    length: 3,
    tracks: ['green'],
    coords: [
      [1228, 867],
      [1261, 929],
      [1296, 995],
    ],
  },
  {
    id: 52,
    cities: ['LR', 'OKC'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1075, 811],
      [1147, 809],
    ],
  },
  {
    id: 53,
    cities: ['LR', 'STL'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1209, 762],
      [1225, 694],
    ],
  },
  {
    id: 54,
    cities: ['LV', 'LA'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [292, 837],
      [239, 886],
    ],
  },
  {
    id: 55,
    cities: ['LV', 'SLC'],
    length: 3,
    tracks: ['orange'],
    coords: [
      [396, 801],
      [436, 741],
      [456, 669],
    ],
  },
  {
    id: 56,
    cities: ['MIA', 'NO'],
    length: 6,
    tracks: ['red'],
    coords: [
      [1401, 1028],
      [1467, 1000],
      [1539, 990],
      [1611, 1010],
      [1671, 1052],
      [1721, 1101],
    ],
  },
  {
    id: 57,
    cities: ['MON', 'NY'],
    length: 3,
    tracks: ['blue'],
    coords: [
      [1710, 156],
      [1722, 224],
      [1733, 296],
    ],
  },
  {
    id: 58,
    cities: ['MON', 'SSM'],
    length: 5,
    tracks: ['black'],
    coords: [
      [1375, 179],
      [1437, 137],
      [1503, 108],
      [1572, 88],
      [1643, 79],
    ],
  },
  {
    id: 59,
    cities: ['MON', 'TOR'],
    length: 3,
    tracks: ['grey'],
    coords: [
      [1663, 114],
      [1602, 153],
      [1556, 211],
    ],
  },
  {
    id: 60,
    cities: ['NAS', 'PIT'],
    length: 4,
    tracks: ['yellow'],
    coords: [
      [1413, 673],
      [1453, 611],
      [1508, 561],
      [1561, 511],
    ],
  },
  {
    id: 61,
    cities: ['NAS', 'RAL'],
    length: 3,
    tracks: ['black'],
    coords: [
      [1463, 683],
      [1531, 655],
      [1601, 648],
    ],
  },
  {
    id: 62,
    cities: ['NAS', 'STL'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1351, 704],
      [1283, 682],
    ],
  },
  {
    id: 63,
    cities: ['NY', 'PIT'],
    length: 2,
    tracks: ['white', 'green'],
    coords: [
      [1628, 401],
      [1692, 363],
      [1643, 421],
      [1702, 384],
    ],
  },
  {
    id: 64,
    cities: ['NY', 'WAS'],
    length: 2,
    tracks: ['orange', 'black'],
    coords: [
      [1754, 411],
      [1757, 481],
      [1777, 413],
      [1781, 484],
    ],
  },
  {
    id: 65,
    cities: ['OKC', 'SFE'],
    length: 3,
    tracks: ['blue'],
    coords: [
      [768, 850],
      [837, 842],
      [908, 833],
    ],
  },
  {
    id: 66,
    cities: ['PHX', 'SFE'],
    length: 3,
    tracks: ['grey'],
    coords: [
      [523, 930],
      [587, 904],
      [654, 873],
    ],
  },
  {
    id: 67,
    cities: ['PIT', 'RAL'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1610, 521],
      [1625, 592],
    ],
  },
  {
    id: 68,
    cities: ['PIT', 'STL'],
    length: 5,
    tracks: ['green'],
    coords: [
      [1534, 484],
      [1470, 520],
      [1409, 556],
      [1344, 594],
      [1281, 629],
    ],
  },
  {
    id: 69,
    cities: ['PIT', 'TOR'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1573, 387],
      [1567, 314],
    ],
  },
  {
    id: 70,
    cities: ['PIT', 'WAS'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1646, 480],
      [1709, 510],
    ],
  },
  {
    id: 71,
    cities: ['POR', 'SEA'],
    length: 1,
    tracks: ['grey', 'grey'],
    coords: [
      [100, 289],
      [124, 297],
    ],
  },
  {
    id: 72,
    cities: ['POR', 'SF'],
    length: 5,
    tracks: ['green', 'pink'],
    coords: [
      [58, 396],
      [39, 463],
      [30, 537],
      [31, 609],
      [44, 680],
      [69, 683],
      [56, 612],
      [55, 537],
      [64, 469],
      [84, 402],
    ],
  },
  {
    id: 73,
    cities: ['POR', 'SLC'],
    length: 6,
    tracks: ['blue'],
    coords: [
      [152, 355],
      [221, 373],
      [286, 406],
      [342, 448],
      [397, 499],
      [436, 558],
    ],
  },
  {
    id: 74,
    cities: ['RAL', 'WAS'],
    length: 2,
    tracks: ['grey', 'grey'],
    coords: [
      [1680, 625],
      [1726, 571],
      [1698, 642],
      [1745, 587],
    ],
  },
  {
    id: 75,
    cities: ['SEA', 'VAN'],
    length: 1,
    tracks: ['grey', 'grey'],
    coords: [
      [124, 189],
      [150, 189],
    ],
  },
  {
    id: 76,
    cities: ['SLC', 'SF'],
    length: 5,
    tracks: ['orange', 'white'],
    coords: [
      [131, 704],
      [194, 684],
      [262, 659],
      [328, 638],
      [396, 616],
      [404, 640],
      [336, 662],
      [270, 683],
      [202, 706],
      [138, 727],
    ],
  },
  {
    id: 77,
    cities: ['SSM', 'TOR'],
    length: 2,
    tracks: ['grey'],
    coords: [
      [1397, 229],
      [1469, 244],
    ],
  },
  {
    id: 78,
    cities: ['SSM', 'WIN'],
    length: 6,
    tracks: ['grey'],
    coords: [
      [1278, 197],
      [1206, 182],
      [1137, 168],
      [1066, 152],
      [995, 138],
      [925, 123],
    ],
  },
].map((route) => {
  return {
    ...route,
    coords: route.coords.map((coord) => correctMapCoords(coord)),
  };
});

export const DESTINATIONS = [
  {
    id: 1,
    cities: ['BOS', 'MIA'],
    points: 12,
  },
  {
    id: 2,
    cities: ['CAL', 'PHX'],
    points: 13,
  },
  {
    id: 3,
    cities: ['CAL', 'SLC'],
    points: 7,
  },
  {
    id: 4,
    cities: ['CHI', 'NO'],
    points: 7,
  },
  {
    id: 5,
    cities: ['CHI', 'SFE'],
    points: 9,
  },
  {
    id: 6,
    cities: ['DAL', 'NY'],
    points: 11,
  },
  {
    id: 7,
    cities: ['DEN', 'EP'],
    points: 4,
  },
  {
    id: 8,
    cities: ['DEN', 'PIT'],
    points: 11,
  },
  {
    id: 9,
    cities: ['DUL', 'EP'],
    points: 10,
  },
  {
    id: 10,
    cities: ['DUL', 'HOU'],
    points: 8,
  },
  {
    id: 11,
    cities: ['HEL', 'LA'],
    points: 8,
  },
  {
    id: 12,
    cities: ['KS', 'HOU'],
    points: 5,
  },
  {
    id: 13,
    cities: ['LA', 'CHI'],
    points: 16,
  },
  {
    id: 14,
    cities: ['LA', 'MIA'],
    points: 20,
  },
  {
    id: 15,
    cities: ['LA', 'NY'],
    points: 21,
  },
  {
    id: 16,
    cities: ['MON', 'ATL'],
    points: 9,
  },
  {
    id: 17,
    cities: ['MON', 'NO'],
    points: 13,
  },
  {
    id: 18,
    cities: ['NY', 'ATL'],
    points: 6,
  },
  {
    id: 19,
    cities: ['POR', 'NAS'],
    points: 17,
  },
  {
    id: 20,
    cities: ['POR', 'PHX'],
    points: 11,
  },
  {
    id: 21,
    cities: ['SF', 'ATL'],
    points: 17,
  },
  {
    id: 22,
    cities: ['SSM', 'NAS'],
    points: 8,
  },
  {
    id: 23,
    cities: ['SSM', 'OKC'],
    points: 9,
  },
  {
    id: 24,
    cities: ['SEA', 'LA'],
    points: 9,
  },
  {
    id: 25,
    cities: ['SEA', 'NY'],
    points: 22,
  },
  {
    id: 26,
    cities: ['TOR', 'MIA'],
    points: 10,
  },
  {
    id: 27,
    cities: ['VAN', 'MON'],
    points: 20,
  },
  {
    id: 28,
    cities: ['VAN', 'SFE'],
    points: 13,
  },
  {
    id: 29,
    cities: ['WIN', 'HOU'],
    points: 12,
  },
  {
    id: 30,
    cities: ['WIN', 'LR'],
    points: 11,
  },
  {
    id: 31,
    tags: ['1910'],
    cities: ['BOS', 'WAS'],
    points: 4,
  },
  {
    id: 32,
    tags: ['1910'],
    cities: ['CAL', 'NAS'],
    points: 14,
  },
  {
    id: 33,
    tags: ['1910'],
    cities: ['CHI', 'ATL'],
    points: 5,
  },
  {
    id: 34,
    tags: ['1910'],
    cities: ['CHI', 'BOS'],
    points: 7,
  },
  {
    id: 35,
    tags: ['1910'],
    cities: ['CHI', 'NY'],
    points: 5,
  },
  {
    id: 36,
    tags: ['1910'],
    cities: ['DEN', 'STL'],
    points: 6,
  },
  {
    id: 37,
    tags: ['1910'],
    cities: ['DUL', 'DAL'],
    points: 7,
  },
  {
    id: 38,
    tags: ['1910'],
    cities: ['HOU', 'WAS'],
    points: 10,
  },
  {
    id: 39,
    tags: ['1910'],
    cities: ['KS', 'BOS'],
    points: 11,
  },
  {
    id: 40,
    tags: ['1910'],
    cities: ['LV', 'MIA'],
    points: 21,
  },
  {
    id: 41,
    tags: ['1910'],
    cities: ['LV', 'NY'],
    points: 19,
  },
  {
    id: 42,
    tags: ['1910'],
    cities: ['LA', 'ATL'],
    points: 15,
  },
  {
    id: 43,
    tags: ['1910'],
    cities: ['LA', 'CAL'],
    points: 12,
  },
  {
    id: 44,
    tags: ['1910'],
    cities: ['LA', 'OKC'],
    points: 9,
  },
  {
    id: 45,
    tags: ['1910'],
    cities: ['MON', 'CHI'],
    points: 7,
  },
  {
    id: 46,
    tags: ['1910'],
    cities: ['MON', 'DAL'],
    points: 13,
  },
  {
    id: 47,
    tags: ['1910'],
    cities: ['MON', 'RAL'],
    points: 7,
  },
  {
    id: 48,
    tags: ['1910'],
    cities: ['NAS', 'NY'],
    points: 6,
  },
  {
    id: 49,
    tags: ['1910'],
    cities: ['NY', 'MIA'],
    points: 10,
  },
  {
    id: 50,
    tags: ['1910'],
    cities: ['OMA', 'NO'],
    points: 8,
  },
  {
    id: 51,
    tags: ['1910'],
    cities: ['PHX', 'BOS'],
    points: 19,
  },
  {
    id: 52,
    tags: ['1910'],
    cities: ['PIT', 'NO'],
    points: 8,
  },
  {
    id: 53,
    tags: ['1910'],
    cities: ['POR', 'HOU'],
    points: 16,
  },
  {
    id: 54,
    tags: ['1910'],
    cities: ['POR', 'PIT'],
    points: 19,
  },
  {
    id: 55,
    tags: ['1910'],
    cities: ['STL', 'MIA'],
    points: 8,
  },
  {
    id: 56,
    tags: ['1910'],
    cities: ['SLC', 'CHI'],
    points: 11,
  },
  {
    id: 57,
    tags: ['1910'],
    cities: ['SLC', 'KS'],
    points: 7,
  },
  {
    id: 58,
    tags: ['1910'],
    cities: ['SF', 'SSM'],
    points: 17,
  },
  {
    id: 59,
    tags: ['1910'],
    cities: ['SF', 'WAS'],
    points: 21,
  },
  {
    id: 60,
    tags: ['1910'],
    cities: ['SSM', 'MIA'],
    points: 12,
  },
  {
    id: 61,
    tags: ['1910'],
    cities: ['SEA', 'LV'],
    points: 10,
  },
  {
    id: 62,
    tags: ['1910'],
    cities: ['SEA', 'OKC'],
    points: 14,
  },
  {
    id: 63,
    tags: ['1910'],
    cities: ['TOR', 'CHA'],
    points: 6,
  },
  {
    id: 64,
    tags: ['1910'],
    cities: ['VAN', 'DEN'],
    points: 11,
  },
  {
    id: 65,
    tags: ['1910'],
    cities: ['VAN', 'DUL'],
    points: 13,
  },
  {
    id: 66,
    tags: ['1910'],
    cities: ['VAN', 'POR'],
    points: 2,
  },
  {
    id: 67,
    tags: ['1910'],
    cities: ['WAS', 'ATL'],
    points: 4,
  },
  {
    id: 68,
    tags: ['1910'],
    cities: ['WIN', 'OMA'],
    points: 6,
  },
  {
    id: 69,
    tags: ['1910'],
    cities: ['WIN', 'SFE'],
    points: 10,
  },
];
