import { movePlayer } from "../js/data/state-manager.js";
import { DIRECTIONS } from "../js/data/constants.js";

export function bindKeyboardsControlForMovingPlayers() {
  window.addEventListener("keyup", ({ code }) => {
    switch (code) {
      case "ArrowUp": {
        movePlayer(1, DIRECTIONS.UP);
        break;
      }
      case "ArrowDown": {
        movePlayer(1, DIRECTIONS.DOWN);
        break;
      }
      case "ArrowLeft": {
        movePlayer(1, DIRECTIONS.LEFT);
        break;
      }
      case "ArrowRight": {
        movePlayer(1, DIRECTIONS.RIGHT);
        break;
      }
      case "KeyW": {
        movePlayer(2, DIRECTIONS.UP);
        break;
      }
      case "KeyS": {
        movePlayer(2, DIRECTIONS.DOWN);
        break;
      }
      case "KeyA": {
        movePlayer(2, DIRECTIONS.LEFT);
        break;
      }
      case "KeyD": {
        movePlayer(2, DIRECTIONS.RIGHT);
        break;
      }
    }
  });
}
