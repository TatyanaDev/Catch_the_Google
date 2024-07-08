import { getPoints, getGameStartTime, subscribe, unsubscribe } from "../../js/data/state-manager.js";
import { PointComponent } from "../common/Point/Point.component.js";
import { createElement } from "../../js/utils/createElement.js";
import { EVENTS } from "../../js/data/constants.js";

export function GamePointsComponent() {
  const container = createElement("article", { class: "game-points-wrapper" });

  const gameStartTime = getGameStartTime();
  const points = getPoints();

  const localState = {
    points,
    gameStartTime,
    elapsedTime: 0,
  };

  const handler = ({ type }) => {
    switch (type) {
      case EVENTS.SCORES_CHANGED:
        localState.points = getPoints();
        render(container, localState);
        break;
      case EVENTS.GAME_STARTED:
        localState.gameStartTime = getGameStartTime();
        render(container, localState);
        break;
    }
  };

  subscribe(handler);

  function updateElapsedTime() {
    if (localState.gameStartTime) {
      const currentTime = Date.now();

      localState.elapsedTime = currentTime - localState.gameStartTime;
    }
  }

  function updateAndRender() {
    updateElapsedTime();
    render(container, localState);
    requestAnimationFrame(updateAndRender);
  }

  updateAndRender();

  return {
    container,
    cleanup: () => unsubscribe(handler),
  };
}

function render(element, localState) {
  const gamePointsContainer = createElement("div", { class: "game-points-container" });

  element.innerHTML = "";

  const elapsedTime = Math.floor(localState.elapsedTime / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  gamePointsContainer.append(PointComponent("Player 1", localState.points.players[0].value, "./assets/icons/player-1.svg", "Player 1"), PointComponent("Player 2", localState.points.players[1].value, "./assets/icons/player-2.svg", "Player 2"), PointComponent("Google", localState.points.google, "./assets/icons/google.svg", "Google"), PointComponent("Time:", `${formattedMinutes}:${formattedSeconds}`));

  element.append(gamePointsContainer);
}
