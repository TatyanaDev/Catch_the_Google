import { createElement } from "../../../js/utils/createElement.js";
import { getPoints } from "../../../js/data/state-manager.js";

export function PointsComponent() {
  const pointBlock = (title, point) => {
    const gamePointBlock = createElement("div", { class: "game-point-block" });
    const gamePointTitle = createElement("span", { class: "game-point-title", innerText: title });
    const gamePoint = createElement("span", { class: "game-point", innerText: point });

    gamePointBlock.append(gamePointTitle, gamePoint);

    return gamePointBlock;
  };

  const points = getPoints();

  const catchBlock = pointBlock("Catch:", points.catch);
  const missBlock = pointBlock("Miss:", points.miss);

  return { catchBlock, missBlock };
}
