import { catchGoogle, getGooglePosition } from "../../../js/data/state-manager.js";
import { createElement } from "../../../js/utils/createElement.js";
import { GoogleComponent } from "./Google/Google.component.js";

export function ColComponent(x, y) {
  const container = createElement("td", { class: "col" });

  const googlePosition = getGooglePosition();

  if (googlePosition.x === x && googlePosition.y === y) {
    container.append(GoogleComponent());
    container.addEventListener("click", catchGoogle);
  }

  return container;
}
