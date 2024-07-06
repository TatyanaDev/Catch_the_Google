import { PointComponent } from "../common/Point/Point.component.js";
import { getPoints, getTime } from "../../js/data/state-manager.js";
import { createElement } from "../../js/utils/createElement.js";

export function GamePointsComponent() {
  const container = createElement("article", { class: "game-points-wrapper" });
  const gamePointsContainer = createElement("div", { class: "game-points-container" });

  const { google, players } = getPoints();
  const time = getTime();

  const minutes = Math.floor(time / 60);
  const secs = time % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");

  gamePointsContainer.append(PointComponent("Player 1", players[0].value, "./assets/icons/player-1.svg", "Player 1"), PointComponent("Player 2", players[1].value, "./assets/icons/player-2.svg", "Player 2"), PointComponent("Google", google, "./assets/icons/google.svg", "Google"), PointComponent("Time:", `${formattedMinutes}:${formattedSeconds}`));

  container.append(gamePointsContainer);

  return container;
}
