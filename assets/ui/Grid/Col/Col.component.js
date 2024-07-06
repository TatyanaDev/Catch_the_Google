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
    if (event.type === EVENTS.GOOGLE_JUMPED) {
      const newGooglePosition = getGooglePosition();

      if ((newGooglePosition.x === localState.x && newGooglePosition.y === localState.y) || (localState.googlePosition.x === localState.x && localState.googlePosition.y === localState.y)) {
        localState.googlePosition = newGooglePosition;

        render(container, localState);
      }
    }

    if (event.type === EVENTS.PLAYER1_MOVED) {
      const newPlayerPositions = getPlayerPositions();

      if ((newPlayerPositions[0].x === localState.x && newPlayerPositions[0].y === localState.y) || (localState.playerPositions[0].x === localState.x && localState.playerPositions[0].y === localState.y)) {
        localState.playerPositions = newPlayerPositions;

        render(container, localState);
      }
    }

    if (event.type === EVENTS.PLAYER2_MOVED) {
      const newPlayerPositions = getPlayerPositions();

      if ((newPlayerPositions[1].x === localState.x && newPlayerPositions[1].y === localState.y) || (localState.playerPositions[1].x === localState.x && localState.playerPositions[1].y === localState.y)) {
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

  const { googlePosition, playerPositions, x, y } = localState;

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
