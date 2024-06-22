import { createElement } from "../../../js/utils/createElement.js";

export function ButtonComponent(innerText, onClickHandler) {
  const container = createElement("button", { class: "button", innerText });

  container.addEventListener("click", onClickHandler);

  return container;
}
