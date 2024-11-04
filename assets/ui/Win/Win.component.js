import { ModalComponent } from "../common/Modal/Modal.component.js";
import { getPoints } from "../../js/data/state-manager.proxy.js";
import { createElement } from "../../js/utils/createElement.js";

export function WinComponent() {
  const container = createElement("div");

  (async () => {
    const { players } = await getPoints();

    const player1 = players[0];
    const player2 = players[1];

    const winner = player1.value > player2.value ? 1 : 2;
    const winningPoints = Math.max(player1.value, player2.value);

    container.appendChild(ModalComponent("./assets/icons/win.svg", "Win", "You Win!", `Player ${winner}`, winningPoints));
  })();

  return container;
}
