import { getIsSoundOn, subscribe } from "../../js/data/state-manager.js";
import googleCaughtSound from '../../../assets/sounds/miss.mp3'
import googleMissSound from '../../../assets/sounds/miss.mp3'
import { EVENTS } from "../../js/data/constants.js";

export function AudioComponent() {
  const audioElements = {
    [EVENTS.GOOGLE_RUN_AWAY]: new Audio(googleMissSound),
    [EVENTS.GOOGLE_CAUGHT]: new Audio(googleCaughtSound),
  };

  const playAudio = (type) => {
    if (getIsSoundOn()) {
      const audio = audioElements[type];

      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  };

  subscribe(({ type }) => {
    if (type in audioElements) {
      playAudio(type);
    }
  });
}
