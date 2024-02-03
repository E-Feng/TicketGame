import { sendEventToFirebase } from '../scenes/Bootstrap';

export default class Command {
  send(event) {
    sendEventToFirebase(event)
  }

  execute(gameState, event) {
    gameState.toInvoke.push(event)
  }
}
