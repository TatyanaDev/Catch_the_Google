import { createElement } from "../../../js/utils/createElement.js";

export function PointComponent(title, point, src, alt) {
  const container = createElement("div", { class: "game-point-block" });
  const gamePointTitle = createElement("span", { class: "game-point-title", innerText: title });
  const gamePoint = createElement("span", { class: "game-point", innerText: point });

  container.append(gamePointTitle);

  if (src && alt) {
    const gamePointImg = createElement("img", { class: "game-point-img", src, alt });

    container.append(gamePointImg);
  }

  container.append(gamePoint);

  return container;
}
