import { ModalComponent } from "../common/Modal/Modal.component.js";
import { getPoints } from "../../js/data/state-manager.js";

export function WinComponent() {
  const { players } = getPoints();

  const player1 = players[0];
  const player2 = players[1];

  const winner = player1.value > player2.value ? 1 : 2;
  const winningPoints = Math.max(player1.value, player2.value);

  return ModalComponent("./assets/icons/win.svg", "Win", "You Win!", `Player ${winner}`, winningPoints);
}
