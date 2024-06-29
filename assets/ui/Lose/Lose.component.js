import { ModalComponent } from "../common/Modal/Modal.component.js";
import { getPoints } from "../../js/data/state-manager.js";

export function LoseComponent() {
  const { google } = getPoints();

  return ModalComponent("./assets/icons/lose.svg", "Lose", "Google Win!", "You'll be lucky next time", google);
}
