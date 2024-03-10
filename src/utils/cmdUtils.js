import BuildCmd from '../commands/BuildCmd';
import DrawCmd from '../commands/DrawCmd';
import DrawFaceUpCmd from '../commands/DrawFaceUpCmd'
import DrawDestCmd from '../commands/DrawDestCmd';
import EndTurnCmd from '../commands/EndTurnCmd';
import ShuffleCmd from '../commands/ShuffleCmd';

export const createCommand = (command, gameState, player, payload) => {
  let cmd;

  switch (command) {
    case 'build':
      cmd = new BuildCmd(gameState, player, payload, false);
      break;
    case 'draw':
      cmd = new DrawCmd(gameState, player, payload, false);
      break;
    case 'drawFaceUp':
      cmd = new DrawFaceUpCmd(gameState, player, payload, false);
      break;
    case 'drawDest':
      cmd = new DrawDestCmd(gameState, player, payload, false);
      break;
    case 'endTurn':
      cmd = new EndTurnCmd(gameState, player, payload, false);
      break;
    case 'shuffle':
      cmd = new ShuffleCmd(gameState, null, payload, false);
      break;
  }

  return cmd;
};
