import { WebSocketServer } from "ws";
import { subscribe } from "./state-manager.js";
import app from "./app.js";

const port = 5000;

const server = app.listen(port, () => console.log(`Server has been started on port ${port}`));

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  subscribe((event) => ws.send(JSON.stringify(event)));

  ws.on("close", () => console.log("Client disconnected"));
});
