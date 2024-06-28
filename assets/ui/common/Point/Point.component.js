import { createElement } from "../../../js/utils/createElement.js";

export function PointComponent(title, point) {
  const container = createElement("div", { class: "game-point-block" });
  const gamePointTitle = createElement("span", { class: "game-point-title", innerText: title });
  const gamePoint = createElement("span", { class: "game-point", innerText: point });

  container.append(gamePointTitle, gamePoint);

  return container;
}
