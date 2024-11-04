import { fetchData } from "../utils/fetchData.js";
import { sendData } from "../utils/sendData.js";

const socket = new WebSocket("ws://localhost:5000");
const _observers = [];

socket.addEventListener("message", (event) => {
  const serverEvent = JSON.parse(event.data);

  _observers.forEach((observer) => observer(serverEvent));
});

export function subscribe(subscriber) {
  _observers.push(subscriber);
}

export function unsubscribe(subscriber) {
  const index = _observers.indexOf(subscriber);

  if (index === -1) {
    return;
  }

  _observers.splice(index, 1);
}

// getters
export async function getPoints() {
  return await fetchData("getPoints");
}

export async function getGameStatus() {
  return fetchData("getGameStatus");
}

export async function getGridSize() {
  return fetchData("getGridSize");
}

export async function getGooglePosition() {
  return fetchData("getGooglePosition");
}

export async function getPlayerPositions() {
  return fetchData("getPlayerPositions");
}

export async function getSettings() {
  return fetchData("getSettings");
}

export async function getGameStartTime() {
  return fetchData("getGameStartTime");
}

export async function getIsGameInfoHidden() {
  return fetchData("getIsGameInfoHidden");
}

export async function getIsSoundOn() {
  return fetchData("getIsSoundOn");
}

// setters
export function setSettings(gridSize, pointsToWin, pointsToLose) {
  return sendData("setSettings", "PUT", { gridSize, pointsToWin, pointsToLose });
}

export function startGame() {
  return sendData("startGame", "POST");
}

export function playAgain() {
  return sendData("playAgain", "POST");
}

export function movePlayer(id, direction) {
  return sendData("movePlayer", "PUT", { id, direction });
}

export function hideGameInfo() {
  return sendData("hideGameInfo", "PUT");
}

export function toggleSound() {
  return sendData("toggleSound", "PUT");
}
