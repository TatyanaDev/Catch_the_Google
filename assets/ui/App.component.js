import { GamePointsComponent } from "./GamePoints/GamePoints.component.js";
import { StartGameComponent } from "./StartGame/StartGame.component.js";
import { SettingsComponent } from "./Settings/Settings.component.js";
import { createElement } from "../js/utils/createElement.js";
import { getGameStatus } from "../js/data/state-manager.js";
import { LoseComponent } from "./Lose/Lose.component.js";
import { GridComponent } from "./Grid/Grid.component.js";
import { InfoComponent } from "./Info/Info.component.js";
import { GAME_STATUSES } from "../js/data/constants.js";
import { WinComponent } from "./Win/Win.component.js";

export function AppComponent() {
  const section = createElement("section", { class: "game-container" });

  const status = getGameStatus();

  const transitions = {
    [GAME_STATUSES.SETTINGS]: () => section.append(SettingsComponent(), StartGameComponent()),
    [GAME_STATUSES.IN_PROGRESS]: () => section.append(SettingsComponent(), GamePointsComponent(), InfoComponent(), GridComponent()),
    [GAME_STATUSES.WIN]: () => section.append(WinComponent()),
    [GAME_STATUSES.LOSE]: () => section.append(LoseComponent()),
  };

  transitions[status]();

  return section;
}
