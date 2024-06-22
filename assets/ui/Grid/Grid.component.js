import { createElement } from "../../js/utils/createElement.js";
import { getGridSize } from "../../js/data/state-manager.js";
import { ColComponent } from "./Col/Col.component.js";

export function GridComponent() {
  const container = createElement("article");
  const gameTable = createElement("table", { class: "game-table" });
  const tbody = createElement("tbody");

  gameTable.append(tbody);
  container.append(gameTable);

  const gridSize = getGridSize();

  for (let y = 0; y < gridSize; y++) {
    const rowElement = createElement("tr");

    for (let x = 0; x < gridSize; x++) {
      rowElement.append(ColComponent(x, y));
    }

    tbody.append(rowElement);
  }

  return container;
}
