import DrawCommand from './DrawCommand';

export const createCommand = (command, gameState, player) => {
  let cmd;

  switch (command) {
    case 'draw':
      cmd = new DrawCommand(gameState, player, false);
      break;
  }

  return cmd;
};
