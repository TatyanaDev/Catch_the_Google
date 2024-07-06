import { playAgain, getTime } from "../../../js/data/state-manager.js";
import { createElement } from "../../../js/utils/createElement.js";
import { ButtonComponent } from "../Button/Button.component.js";
import { PointComponent } from "../Point/Point.component.js";

export function ModalComponent(src, alt, titleModalInnerText, textModalInnerText, point) {
  const container = createElement("article", { class: "result-wrapper" });
  const modalWrapper = createElement("div", { class: "modal-wrapper" });
  const modalDecoration = createElement("div", { class: "modal-decoration" });
  const modalDecorationImg = createElement("img", { src, alt });
  const modalContainer = createElement("div", { class: "modal-container" });
  const titleModal = createElement("div", { class: "title-modal", innerText: titleModalInnerText });
  const textModal = createElement("div", { class: "text-modal", innerText: textModalInnerText });
  const modalResult = createElement("div", { class: "modal-result" });

  const time = getTime();

  const minutes = Math.floor(time / 60);
  const secs = time % 60;

  modalDecoration.append(modalDecorationImg);
  modalResult.append(PointComponent("Catch:", point), PointComponent("Time", `${minutes}m ${secs}s`));
  modalContainer.append(titleModal, textModal, modalResult, ButtonComponent("Play again", playAgain));
  modalWrapper.append(modalDecoration, modalContainer);
  container.append(modalWrapper);

  return container;
}
