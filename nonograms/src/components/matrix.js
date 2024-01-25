const data = [
  {
    matrix: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    leftClues: ['', '', 5, '', '', 1, '', '', 5, '', '', 1, '', '', 5],
    topClues: ['', 1, 1, 1, '', 3, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    name: 'snake(5x5)',
  },
  {
    matrix: [
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
    ],
    leftClues: ['', '', 3, '', 2, 2, '', 1, 1, '', 2, 2, '', '', 3],
    topClues: ['', '', '', '', '', '', 2, 1, 2, '', 3, 2, 1, 2, 3],
    name: 'cross(5x5)',
  },
  {
    matrix: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
    ],
    leftClues: ['', 1, 1, '', '', 5, '', 1, 1, '', '', 5, '', 1, 1],
    topClues: ['', '', '', '', '', 1, '', 1, '', 1, 1, 5, 1, 5, 1],
    name: 'sharp(5x5)',
  },
  {
    matrix: [
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
    ],
    leftClues: [1, 1, 1, '', 1, 1, 1, 1, 1, '', 1, 1, 1, 1, 1],
    topClues: [1, '', 1, '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    name: 'shess(5x5)',
  },
  {
    matrix: [
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
    ],
    leftClues: [1, 1, 1, '', '', 3, '', 2, 2, '', '', 3, 1, 1, 1],
    topClues: [1, '', '', '', 1, 1, '', 2, '', 1, 1, 3, 2, 3, 1],
    name: 'snowflake(5x5)',
  },
  {
    matrix: [
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ],
    leftClues: [1, 1, 1, '', '', 5, '', '', 3, '', 1, 1, '', '', 3],
    topClues: ['', '', '', '', '', '', '', 3, '', '', 2, 4, 1, 4, 2],
    name: 'tower(5x5)',
  },
  {
    matrix: [
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    leftClues: ['', '', 5, 1, 1, 1, '', 3, 1, 1, 1, 1, '', '', 5],
    topClues: ['', 1, '', '', '', '', 1, '', 1, '', 5, 1, 5, 1, 5],
    name: 'window(5x5)',
  },
  // {
  //   matrix: [
  //     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  //     [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  //     [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  //     [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   ],
  //   leftClues: [0, 0, 2, 0, 0, 4, 0, 0, 6, 0, 0, 8, 0, 0, 10, 0, 4, 4, 0, 4, 4, 0, 0, 10, 0, 0, 10, 0, 0, 10],
  //   topClues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 6, 7, 8, 9, 3, 3, 9, 8, 7, 6],
  // },
];

export default data;
