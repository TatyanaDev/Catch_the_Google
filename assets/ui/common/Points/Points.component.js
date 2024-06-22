import { createElement } from "../../../js/utils/createElement.js";
import { getPoints } from "../../../js/data/state-manager.js";

export function PointsComponent() {
  const gamePointBlock = (title, point) => {
    const block = createElement("div", { class: "game-point-block" });

    block.append(createElement("span", { class: "game-point-title", innerText: title }));
    block.append(createElement("span", { class: "game-point", innerText: point }));

    return block;
  };

  const points = getPoints();

  const catchBlock = gamePointBlock("Catch:", points.catch);
  const missBlock = gamePointBlock("Miss:", points.miss);

  return { catchBlock, missBlock };
}
