import { getIsGameInfoHidden, hideGameInfo, subscribe, unsubscribe } from "../../js/data/state-manager.proxy.js";
import { createElement } from "../../js/utils/createElement.js";
import { EVENTS } from "../../js/data/constants.js";

export function InfoComponent() {
  const container = createElement("article", { class: "game-info-wrapper" });

  const localState = {
    isGameInfoHidden: false,
  };

  (async () => {
    localState.isGameInfoHidden = await getIsGameInfoHidden();
    render(container, localState);
  })();

  const handler = async ({ type }) => {
    if (type === EVENTS.GAME_INFO_HIDDEN) {
      localState.isGameInfoHidden = await getIsGameInfoHidden();
      render(container, localState);
    }
  };

  subscribe(handler);

  return {
    container,
    cleanup: () => unsubscribe(handler),
  };
}

function render(element, localState) {
  element.innerHTML = "";

  const gameInfoContainer = createElement("div", { class: "game-info-container" });
  const gameInfoIcon = createElement("img", { src: "./assets/icons/info.svg", alt: "!" });
  const gameInfo = createElement("p", { class: "game-info", innerText: "Control is done with “arrows for player 1” and “WASD for player 2”" });
  const infoButton = createElement("button", { class: "info-button", innerText: "OK" });

  infoButton.addEventListener("click", hideGameInfo);
  gameInfoContainer.append(gameInfoIcon, gameInfo, infoButton);

  if (localState.isGameInfoHidden) {
    element.style.display = "none";
  }

  element.append(gameInfoContainer);
}
