import { getGooglePosition, getPlayerPositions } from "../../../js/data/state-manager.js";
import { createElement } from "../../../js/utils/createElement.js";

export function ColComponent(x, y) {
  const container = createElement("td", { class: "col" });

  const playerPositions = getPlayerPositions();
  const googlePosition = getGooglePosition();

  if (googlePosition.x === x && googlePosition.y === y) {
    container.append(createElement("img", { src: "./assets/icons/google.svg", alt: "Google" }));
  }

  if (playerPositions[0].x === x && playerPositions[0].y === y) {
    container.append(createElement("img", { src: "./assets/icons/player-1.svg", alt: "Player 1" }));
  }

  if (playerPositions[1].x === x && playerPositions[1].y === y) {
    container.append(createElement("img", { src: "./assets/icons/player-2.svg", alt: "Player 2" }));
  }

  return container;
}
