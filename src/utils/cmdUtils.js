import ShuffleCmd from '../commands/ShuffleCmd';
import BuildCmd from '../commands/BuildCmd';
import DrawCmd from '../commands/DrawCmd';
import DrawFaceUpCmd from '../commands/DrawFaceUpCmd';
import DrawDestCmd from '../commands/DrawDestCmd';
import DecideDestCmd from '../commands/DecideDestCmd';
import EndTurnCmd from '../commands/EndTurnCmd';

export const createCommand = (scene, command, gameState, player, payload) => {
  let cmd;

  switch (command) {
    case 'shuffle':
      cmd = new ShuffleCmd(scene, gameState, null, payload, false);
      break;
    case 'build':
      cmd = new BuildCmd(scene, gameState, player, payload, false);
      break;
    case 'draw':
      cmd = new DrawCmd(scene, gameState, player, payload, false);
      break;
    case 'drawFaceUp':
      cmd = new DrawFaceUpCmd(scene, gameState, player, payload, false);
      break;
    case 'drawDest':
      cmd = new DrawDestCmd(scene, gameState, player, payload, false);
      break;
    case 'decideDest':
      cmd = new DecideDestCmd(scene, gameState, player, payload, false);
      break;
    case 'endTurn':
      cmd = new EndTurnCmd(scene, gameState, player, payload, false);
      break;
  }

  return cmd;
};
