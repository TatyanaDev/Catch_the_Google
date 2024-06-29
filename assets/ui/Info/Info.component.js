import { hideGameInfo, getIsGameInfoHidden } from "../../js/data/state-manager.js";
import { createElement } from "../../js/utils/createElement.js";

export function InfoComponent() {
  const container = createElement("article", { class: "game-info-wrapper" });
  const gameInfoContainer = createElement("div", { class: "game-info-container" });
  const gameInfoIcon = createElement("img", { src: "./assets/icons/info.svg", alt: "!" });
  const gameInfo = createElement("p", { class: "game-info", innerText: "Control is done with “arrows for player 1” and “WASD for player 2”" });
  const infoButton = createElement("button", { class: "info-button", innerText: "OK" });

  infoButton.addEventListener("click", hideGameInfo);
  gameInfoContainer.append(gameInfoIcon, gameInfo, infoButton);
  container.append(gameInfoContainer);

  if (getIsGameInfoHidden()) {
    container.style.display = "none";
  }

  return container;
}
