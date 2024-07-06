import { getPoints, getTime, subscribe, unsubscribe } from "../../js/data/state-manager.js";
import { PointComponent } from "../common/Point/Point.component.js";
import { createElement } from "../../js/utils/createElement.js";

export function GamePointsComponent() {
  const container = createElement("article", { class: "game-points-wrapper" });

  const points = getPoints();

  const localState = {
    points,
  };

  const handler = () => {
    localState.points = getPoints();

    render(container, localState);
  };

  subscribe(handler);

  render(container, localState);

  return {
    container,
    cleanup: () => unsubscribe(handler),
  };
}

function render(element, localState) {
  const gamePointsContainer = createElement("div", { class: "game-points-container" });

  element.innerHTML = "";

  const time = getTime();

  const minutes = Math.floor(time / 60);
  const secs = time % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");

  gamePointsContainer.append(PointComponent("Player 1", localState.points.players[0].value, "./assets/icons/player-1.svg", "Player 1"), PointComponent("Player 2", localState.points.players[1].value, "./assets/icons/player-2.svg", "Player 2"), PointComponent("Google", localState.points.google, "./assets/icons/google.svg", "Google"), PointComponent("Time:", `${formattedMinutes}:${formattedSeconds}`));

  element.append(gamePointsContainer);
}
