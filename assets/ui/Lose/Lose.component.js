import { ModalComponent } from "../common/Modal/Modal.component.js";
import { getPoints } from "../../js/data/state-manager.proxy.js";
import { createElement } from "../../js/utils/createElement.js";

export function LoseComponent() {
  const container = createElement("div");

  (async () => {
    const { google } = await getPoints();

    container.appendChild(ModalComponent("./assets/icons/lose.svg", "Lose", "Google Win!", "You'll be lucky next time", google));
  })();

  return container;
}
