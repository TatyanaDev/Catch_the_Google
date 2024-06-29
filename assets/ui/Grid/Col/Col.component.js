import { getGooglePosition, getPlayerPositions } from "../../../js/data/state-manager.js";
import { createElement } from "../../../js/utils/createElement.js";
import { Player1Component } from "./Player1/Player1.component.js";
import { Player2Component } from "./Player2/Player2.component.js";
import { GoogleComponent } from "./Google/Google.component.js";

export function ColComponent(x, y) {
  const container = createElement("td", { class: "col" });

  const playerPositions = getPlayerPositions();
  const googlePosition = getGooglePosition();

  if (googlePosition.x === x && googlePosition.y === y) {
    container.append(GoogleComponent());
  }

  if (playerPositions[0].x === x && playerPositions[0].y === y) {
    container.append(Player1Component());
  }

  if (playerPositions[1].x === x && playerPositions[1].y === y) {
    container.append(Player2Component());
  }

  return container;
}
