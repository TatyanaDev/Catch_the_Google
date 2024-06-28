import { gridSizeOptions, pointsToWinOptions, pointsToLoseOptions } from "../../js/data/options.js";
import { getSettings, setSettings } from "../../js/data/state-manager.js";
import { createElement } from "../../js/utils/createElement.js";

export function SettingsComponent() {
  const container = createElement("article", { class: "settings-wrapper" });

  const { gridSize, pointsToWin, pointsToLose } = getSettings();

  const createSettingWrapper = (innerText, id, options, selectedValue, onChangeHandler) => {
    const settingWrapper = createElement("div", { class: "setting-wrapper" });
    const settingLabel = createElement("label", { class: "setting-label", innerText, for: id });
    const settingSelect = createElement("select", { class: "setting-select", name: "select", id });

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
  const soundButton = createElement("button", { class: "sound-button" });
  const soundIcon = createElement("span", { class: "sound-icon" });

  const toggleSound = () => soundButton.classList.toggle("on");

  soundButton.append(soundIcon);
  soundButton.addEventListener("click", toggleSound);
  soundWrapper.append(settingLabel, soundButton);
  container.append(gridSizeWrapper, pointsToWinWrapper, pointsToLoseWrapper, soundWrapper);

  return container;
}
