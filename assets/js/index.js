import { AppComponent } from "../ui/App.component.js";
import { subscribe } from "./data/state-manager.js";

const rootElement = document.getElementById("root")

function renderApp() {
  rootElement.innerHTML = "";

  const appElement = AppComponent();

  rootElement.append(appElement);
}

renderApp();
subscribe(renderApp);
