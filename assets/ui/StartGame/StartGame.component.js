import { ButtonComponent } from "../common/Button/Button.component.js";
import { createElement } from "../../js/utils/createElement.js";
import { startGame } from "../../js/data/state-manager.js";

export function StartGameComponent() {
  const container = createElement("article", { class: "button-wrapper" });

  container.append(ButtonComponent("START GAME", startGame));

  return container;
}
