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

  const isCellAffected = (newPosition, oldPosition) => (newPosition.x === localState.x && newPosition.y === localState.y) || (oldPosition.x === localState.x && oldPosition.y === localState.y);

  const handleGoogleJumped = () => {
    const newGooglePosition = getGooglePosition();

    if (isCellAffected(newGooglePosition, localState.googlePosition)) {
      localState.googlePosition = newGooglePosition;
      render(container, localState);
    }
  };

  const handlePlayerMoved = (playerIndex) => {
    const newPlayerPositions = getPlayerPositions();

    if (isCellAffected(newPlayerPositions[playerIndex], localState.playerPositions[playerIndex])) {
      localState.playerPositions = newPlayerPositions;
      render(container, localState);
    }
  };

  const handler = ({ type }) => {
    switch (type) {
      case EVENTS.GOOGLE_JUMPED:
        handleGoogleJumped();
        break;
      case EVENTS.PLAYER1_MOVED:
        handlePlayerMoved(0);
        break;
      case EVENTS.PLAYER2_MOVED:
        handlePlayerMoved(1);
        break;
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
