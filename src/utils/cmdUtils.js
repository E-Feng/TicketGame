import DrawCmd from '../commands/DrawCmd';
import DrawFaceUpCardCmd from '../commands/DrawFaceUpCardCmd';
import EndTurnCmd from '../commands/EndTurnCmd';

export const createCommand = (command, gameState, player, payload) => {
  let cmd;

  switch (command) {
    case 'draw':
      cmd = new DrawCmd(gameState, player, payload, false);
      break;
    case 'drawFaceUpCard':
      cmd = new DrawFaceUpCardCmd(gameState, player, payload, false);
      break;
    case 'endTurn':
      cmd = new EndTurnCmd(gameState, player, payload, false);
      break;
  }

  return cmd;
};
