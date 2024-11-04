import { getGooglePosition, getPlayerPositions, subscribe, unsubscribe } from "../../../js/data/state-manager.proxy.js";
import { createElement } from "../../../js/utils/createElement.js";
import { EVENTS } from "../../../js/data/constants.js";

export function ColComponent(x, y) {
  const container = createElement("td", { class: "col" });

  const localState = {
    googlePosition: { x: 0, y: 0 },
    playerPositions: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ],
    x,
    y,
  };

  (async () => {
    localState.googlePosition = await getGooglePosition();
    localState.playerPositions = await getPlayerPositions();
    render(container, localState);
  })();

  const isCellAffected = (newPosition, oldPosition) => (newPosition.x === localState.x && newPosition.y === localState.y) || (oldPosition.x === localState.x && oldPosition.y === localState.y);

  const handleGoogleJumped = async () => {
    const newGooglePosition = await getGooglePosition();

    if (isCellAffected(newGooglePosition, localState.googlePosition)) {
      localState.googlePosition = newGooglePosition;
      render(container, localState);
    }
  };

  const handlePlayerMoved = async (playerIndex) => {
    const newPlayerPositions = await getPlayerPositions();

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
