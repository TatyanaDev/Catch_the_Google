import { getSettings, setSettings, getIsSoundOn, toggleSound, getGameStatus } from "../../js/data/state-manager.js";
import { gridSizeOptions, pointsToWinOptions, pointsToLoseOptions } from "../../js/data/options.js";
import { createElement } from "../../js/utils/createElement.js";
import { GAME_STATUSES } from "../../js/data/constants.js";

export function SettingsComponent() {
  const container = createElement("article", { class: "settings-wrapper" });

  const { gridSize, pointsToWin, pointsToLose } = getSettings();
  const gameStatus = getGameStatus();
  const isSoundOn = getIsSoundOn();

  const isDisabled = gameStatus === GAME_STATUSES.IN_PROGRESS;

  const createSettingWrapper = (innerText, id, options, selectedValue, onChangeHandler) => {
    const settingWrapper = createElement("div", { class: "setting-wrapper" });
    const settingLabel = createElement("label", { class: "setting-label", innerText, for: id });
    const settingSelect = createElement("select", { class: "setting-select", name: "select", id, disabled: isDisabled });

    settingSelect.addEventListener("change", onChangeHandler);

    options.forEach(({ value, innerText }) => {
      const optionElement = createElement("option", { value, innerText });

      if (parseInt(value) === selectedValue) {
        optionElement.selected = true;
      }

      settingSelect.append(optionElement);
    });

    settingWrapper.append(settingLabel, settingSelect);

    return [settingWrapper, settingSelect];
  };

  const handleSettingChange = () => setSettings(gridSizeSelect.value, pointsToWinSelect.value, pointsToLoseSelect.value);

  const [gridSizeWrapper, gridSizeSelect] = createSettingWrapper("Grid size", "grid-size", gridSizeOptions, gridSize, handleSettingChange);
  const [pointsToWinWrapper, pointsToWinSelect] = createSettingWrapper("Points to win", "points-to-win", pointsToWinOptions, pointsToWin, handleSettingChange);
  const [pointsToLoseWrapper, pointsToLoseSelect] = createSettingWrapper("Points to lose", "points-to-lose", pointsToLoseOptions, pointsToLose, handleSettingChange);

  const soundWrapper = createElement("div");
  const settingLabel = createElement("label", { class: "setting-label", innerText: "Sound on" });
  const soundButton = createElement("button", { class: `sound-button ${isSoundOn ? "on" : ""}`, disabled: isDisabled });
  const soundIcon = createElement("span", { class: "sound-icon" });

  const handleSoundToggle = (soundButton) => {
    toggleSound();
    soundButton.classList.toggle("on");
  };

  soundButton.append(soundIcon);
  soundButton.addEventListener("click", () => handleSoundToggle(soundButton));
  soundWrapper.append(settingLabel, soundButton);
  container.append(gridSizeWrapper, pointsToWinWrapper, pointsToLoseWrapper, soundWrapper);

  return container;
}
