import { PointComponent } from "../common/Point/Point.component.js";
import { createElement } from "../../js/utils/createElement.js";
import { getPoints } from "../../js/data/state-manager.js";

export function GamePointsComponent() {
  const container = createElement("article", { class: "game-points-wrapper" });
  const gamePointsContainer = createElement("div", { class: "game-points-container" });

  const points = getPoints();

  gamePointsContainer.append(PointComponent("Catch:", points.catch), PointComponent("Miss:", points.miss));
  container.append(gamePointsContainer);

  return container;
}
