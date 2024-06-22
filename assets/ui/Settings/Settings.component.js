import { createElement } from "../../js/utils/createElement.js";

export function SettingsComponent() {
  const container = createElement("article", { class: "settings-wrapper" });

  const createSettingWrapper = (innerText, id, options) => {
    const settingWrapper = createElement("div", { class: "setting-wrapper" });
    const settingLabel = createElement("label", { class: "setting-label", innerText, for: id });
    const settingSelect = createElement("select", { class: "setting-select", name: "select", id });

    options.forEach(({ value, innerText }) => {
      const optionElement = createElement("option", { value, innerText });

      settingSelect.append(optionElement);
    });

    settingWrapper.append(settingLabel, settingSelect);

    return settingWrapper;
  };

  const gridSizeOptions = [
    { value: "4", innerText: "4x4" },
    { value: "5", innerText: "5x5" },
    { value: "6", innerText: "6x6" },
    { value: "7", innerText: "7x7" },
    { value: "8", innerText: "8x8" },
  ];

  const pointsToWinOptions = [
    { value: "20", innerText: "20 pts" },
    { value: "40", innerText: "40 pts" },
    { value: "50", innerText: "50 pts" },
    { value: "60", innerText: "60 pts" },
    { value: "80", innerText: "80 pts" },
  ];

  const pointsToLoseOptions = [
    { value: "5", innerText: "5 pts" },
    { value: "10", innerText: "10 pts" },
    { value: "15", innerText: "15 pts" },
    { value: "20", innerText: "20 pts" },
    { value: "25", innerText: "25 pts" },
  ];

  const gridSizeWrapper = createSettingWrapper("Grid size", "grid-size", gridSizeOptions);
  const pointsToWinWrapper = createSettingWrapper("Points to win", "points-to-win", pointsToWinOptions);
  const pointsToLoseWrapper = createSettingWrapper("Points to lose", "points-to-lose", pointsToLoseOptions);

  const soundWrapper = createElement("div");
  const settingLabel = createElement("setting", { class: "setting-label", innerText: "Sound on" });
  const soundButton = createElement("button", { class: "sound-button" });
  const soundIcon = createElement("span", { class: "sound-icon" });

  function toggleSound() {
    soundButton.classList.toggle("on");
  }

  soundButton.append(soundIcon);
  soundButton.addEventListener("click", toggleSound);
  soundWrapper.append(settingLabel, soundButton);
  container.append(gridSizeWrapper, pointsToWinWrapper, pointsToLoseWrapper, soundWrapper);

  return container;
}
