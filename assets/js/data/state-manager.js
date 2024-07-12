import { GAME_STATUSES, DIRECTIONS, EVENTS } from "./constants.js";

const _state = {
  gameStatus: GAME_STATUSES.SETTINGS,
  points: {
    google: 0,
    players: {
      1: { id: 1, value: 0 },
      2: { id: 2, value: 0 },
    },
  },
  settings: {
    pointsToLose: 5,
    pointsToWin: 20,
    gridSize: 4,
  },
  positions: {
    google: {
      x: 0,
      y: 0,
    },
    players: {
      1: { x: 1, y: 1 },
      2: { x: 2, y: 2 },
    },
  },
  gameStartTime: null,
  isGameInfoHidden: false,
  isSoundOn: false,
};

let _observers = [];

function notifyObservers(type, payload = {}) {
  const event = { type, payload };

  _observers.forEach((observer) => observer(event));
}

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

function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function _setGooglePosition(newX, newY) {
  _state.positions.google = { x: newX, y: newY };
}

function _moveGoogleToRandomPosition() {
  const newX = _getRandomInt(_state.settings.gridSize);
  const newY = _getRandomInt(_state.settings.gridSize);

  if (_isCellOccupiedByGoogle({ x: newX, y: newY }) || _isCellOccupiedByPlayer({ x: newX, y: newY })) {
    _moveGoogleToRandomPosition();
    return;
  }

  _setGooglePosition(newX, newY);
}

let _googleIntervalId;

function _incrementGooglePoints() {
  _state.points.google++;
  notifyObservers(EVENTS.GOOGLE_RUN_AWAY);
  notifyObservers(EVENTS.SCORES_CHANGED);

  if (_state.points.google === _state.settings.pointsToLose) {
    clearInterval(_googleIntervalId);
    _state.gameStatus = GAME_STATUSES.LOSE;
    notifyObservers(EVENTS.STATUS_CHANGED);
  } else {
    const oldPosition = getGooglePosition();
    _moveGoogleToRandomPosition();
    const newPosition = getGooglePosition();
    notifyObservers(EVENTS.GOOGLE_JUMPED, { oldPosition, newPosition });
  }
}

function _startGoogleInterval() {
  _googleIntervalId = setInterval(() => {
    if (_state.gameStatus === GAME_STATUSES.IN_PROGRESS) {
      _incrementGooglePoints();
    }
  }, 1000);
}

function _play() {
  clearInterval(_googleIntervalId);
  _startGoogleInterval();
}

function _catchGoogle(playerId) {
  const points = _state.points.players[playerId];
  points.value++;
  notifyObservers(EVENTS.GOOGLE_CAUGHT);
  notifyObservers(EVENTS.SCORES_CHANGED);

  if (points.value === _state.settings.pointsToWin) {
    clearInterval(_googleIntervalId);
    _state.gameStatus = GAME_STATUSES.WIN;
    notifyObservers(EVENTS.STATUS_CHANGED);
  } else {
    _moveGoogleToRandomPosition();
    notifyObservers(EVENTS.GOOGLE_JUMPED);
    clearInterval(_googleIntervalId);
    _startGoogleInterval();
  }
}

// getters
export function getPoints() {
  return {
    google: _state.points.google,
    players: Object.values(_state.points.players).map((points) => ({ ...points })),
  };
}

export function getGameStatus() {
  return _state.gameStatus;
}

export function getGridSize() {
  return _state.settings.gridSize;
}

export function getGooglePosition() {
  return { ..._state.positions.google };
}

export function getPlayerPositions() {
  return Object.values(_state.positions.players).map((position) => ({ ...position }));
}

export function getSettings() {
  return { ..._state.settings };
}

export function getGameStartTime() {
  return _state.gameStartTime;
}

export function getIsGameInfoHidden() {
  return _state.isGameInfoHidden;
}

export function getIsSoundOn() {
  return _state.isSoundOn;
}

// setters
export function setSettings(gridSize, pointsToWin, pointsToLose) {
  _state.settings = {
    gridSize: parseInt(gridSize, 10),
    pointsToWin: parseInt(pointsToWin, 10),
    pointsToLose: parseInt(pointsToLose, 10),
  };
}

function _startGame() {
  _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
  _state.gameStartTime = Date.now();
  notifyObservers(EVENTS.STATUS_CHANGED);
  _play();
  notifyObservers(EVENTS.GAME_STARTED);
}

export function startGame() {
  _startGame();
}

export function playAgain() {
  _state.points.google = 0;
  Object.values(_state.points.players).forEach((player) => (player.value = 0));
  notifyObservers(EVENTS.SCORES_CHANGED);
  _startGame();
}

function _isWithinBounds({ x, y }) {
  return x >= 0 && x < _state.settings.gridSize && y >= 0 && y < _state.settings.gridSize;
}

function _isCellOccupiedByPlayer({ x, y }) {
  return Object.values(_state.positions.players).some((player) => player.x === x && player.y === y);
}

function _isCellOccupiedByGoogle({ x, y }) {
  const googlePosition = getGooglePosition();

  return googlePosition.x === x && googlePosition.y === y;
}

export function movePlayer(id, direction) {
  const position = _state.positions.players[id];
  const oldPosition = { ...position };
  const newPosition = { ...position };

  const updater = {
    [DIRECTIONS.UP]: () => newPosition.y--,
    [DIRECTIONS.DOWN]: () => newPosition.y++,
    [DIRECTIONS.LEFT]: () => newPosition.x--,
    [DIRECTIONS.RIGHT]: () => newPosition.x++,
  };

  updater[direction]();

  if (!_isWithinBounds(newPosition) || _isCellOccupiedByPlayer(newPosition)) {
    return;
  }

  if (_isCellOccupiedByGoogle(newPosition)) {
    _catchGoogle(id);
  }

  _state.positions.players[id] = newPosition;
  notifyObservers(EVENTS[`PLAYER${id}_MOVED`], { oldPosition, newPosition });
}

export function hideGameInfo() {
  _state.isGameInfoHidden = true;
  notifyObservers(EVENTS.GAME_INFO_HIDDEN);
}

export function toggleSound() {
  _state.isSoundOn = !_state.isSoundOn;
  notifyObservers(EVENTS.SOUND_TOGGLED);
}
