import { GamePointsComponent } from "./GamePoints/GamePoints.component.js";
import { StartGameComponent } from "./StartGame/StartGame.component.js";
import { getGameStatus, subscribe } from "../js/data/state-manager.js";
import { SettingsComponent } from "./Settings/Settings.component.js";
import { GAME_STATUSES, EVENTS } from "../js/data/constants.js";
import { createElement } from "../js/utils/createElement.js";
import { AudioComponent } from "./Audio/Audio.component.js";
import { LoseComponent } from "./Lose/Lose.component.js";
import { GridComponent } from "./Grid/Grid.component.js";
import { InfoComponent } from "./Info/Info.component.js";
import { WinComponent } from "./Win/Win.component.js";

export function AppComponent() {
  const section = createElement("section", { class: "game-container" });

  const localState = {
    cleanups: [],
  };

  AudioComponent();

  subscribe(({ type }) => {
    if (type !== EVENTS.STATUS_CHANGED) {
      return;
    }

    render(section, localState);
  });

  render(section, localState);

  return section;
}

function render(element, localState) {
  localState.cleanups.forEach((cleanupFunction) => cleanupFunction());
  localState.cleanups = [];

  element.innerHTML = "";

  const gameStatus = getGameStatus();

  const transitions = {
    [GAME_STATUSES.SETTINGS]: () => element.append(SettingsComponent(), StartGameComponent()),
    [GAME_STATUSES.IN_PROGRESS]: () => {
      const gamePointsWrapper = GamePointsComponent();
      const infoComponentWrapper = InfoComponent();
      const gridWrapper = GridComponent();

      element.append(SettingsComponent(), gamePointsWrapper.container, infoComponentWrapper.container, gridWrapper.container);

      localState.cleanups.push(infoComponentWrapper.cleanup);
      localState.cleanups.push(gamePointsWrapper.cleanup);
      localState.cleanups.push(gridWrapper.cleanup);
    },
    [GAME_STATUSES.WIN]: () => element.append(WinComponent()),
    [GAME_STATUSES.LOSE]: () => element.append(LoseComponent()),
  };

  transitions[gameStatus]();
}
