import { getIsSoundOn, subscribe } from "../../js/data/state-manager.js";
import { EVENTS } from "../../js/data/constants.js";

export function AudioComponent() {
  const basePath = window.location.pathname.includes("Catch_the_Google") ? "/Catch_the_Google" : "";

  const audioElements = {
    [EVENTS.GOOGLE_RUN_AWAY]: new Audio(`${basePath}/assets/sounds/miss.mp3`),
    [EVENTS.GOOGLE_CAUGHT]: new Audio(`${basePath}/assets/sounds/catch.wav`),
  };

  const playAudio = (type) => {
    if (getIsSoundOn()) {
      const audio = audioElements[type];

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((error) => console.warn("Audio play error:", error));
      }
    }
  };

  subscribe(({ type }) => {
    if (type in audioElements) {
      playAudio(type);
    }
  });
}
