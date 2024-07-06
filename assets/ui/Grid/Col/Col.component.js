import { getGooglePosition, getPlayerPositions, subscribe, unsubscribe } from "../../../js/data/state-manager.js";
import { createElement } from "../../../js/utils/createElement.js";
import { EVENTS } from "../../../js/data/constants.js";

export function ColComponent(x, y) {
  const container = createElement("td", { class: "col" });

  const localState = {
    googlePosition: getGooglePosition(),
    playerPositions: getPlayerPositions(),
    x,
    y,
  };

  const handler = (event) => {
    if (event.type === EVENTS.GOOGLE_JUMPED || event.type === EVENTS.PLAYER1_MOVED || event.type === EVENTS.PLAYER2_MOVED) {
      const newGooglePosition = getGooglePosition();
      const newPlayerPositions = getPlayerPositions();

      if ((newGooglePosition.x === localState.x && newGooglePosition.y === localState.y) || (localState.googlePosition.x === localState.x && localState.googlePosition.y === localState.y) || newPlayerPositions.some((pos) => pos.x === localState.x && pos.y === localState.y) || localState.playerPositions.some((pos) => pos.x === localState.x && pos.y === localState.y)) {
        localState.googlePosition = newGooglePosition;
        localState.playerPositions = newPlayerPositions;

        render(container, localState);
      }
    }
  };

  subscribe(handler);

  render(container, localState);

  return {
    container,
    cleanup: () => unsubscribe(handler),
  };
}

function render(element, localState) {
  element.innerHTML = "";

  const googlePosition = localState.googlePosition;
  const playerPositions = localState.playerPositions;

  const { x, y } = localState;

  if (googlePosition.x === x && googlePosition.y === y) {
    element.append(createElement("img", { src: "./assets/icons/google.svg", alt: "Google" }));
  }

  if (playerPositions[0].x === x && playerPositions[0].y === y) {
    element.append(createElement("img", { src: "./assets/icons/player-1.svg", alt: "Player 1" }));
  }

  if (playerPositions[1].x === x && playerPositions[1].y === y) {
    element.append(createElement("img", { src: "./assets/icons/player-2.svg", alt: "Player 2" }));
  }
}
