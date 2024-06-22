import { PointsComponent } from "../common/Points/Points.component.js";
import { createElement } from "../../js/utils/createElement.js";

export function GamePointsComponent() {
  const container = createElement("article", { class: "game-points-wrapper" });
  const gamePointsContainer = createElement("div", { class: "game-points-container" });

  const { catchBlock, missBlock } = PointsComponent();

  gamePointsContainer.append(catchBlock, missBlock);
  container.append(gamePointsContainer);

  return container;
}
