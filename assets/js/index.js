import { bindKeyboardsControlForMovingPlayers } from "../ui/controls.js";
import { AppComponent } from "../ui/App.component.js";

const rootElement = document.getElementById("root");

rootElement.innerHTML = "";

rootElement.append(AppComponent());

bindKeyboardsControlForMovingPlayers();
