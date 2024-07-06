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
  time: 0,
  isGameInfoHidden: false,
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
  _state.positions.google.x = newX;
  _state.positions.google.y = newY;
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
let _timeIntervalId;

function _incrementGooglePoints() {
  _state.points.google++;
  notifyObservers(EVENTS.SCORES_CHANGED);

  if (_state.points.google === _state.settings.pointsToLose) {
    clearInterval(_googleIntervalId);
    clearInterval(_timeIntervalId);

    _state.gameStatus = GAME_STATUSES.LOSE;
    notifyObservers(EVENTS.STATUS_CHANGED);
  } else {
    const payload = {
      oldPosition: getGooglePosition(),
      newPosition: null,
    };

    _moveGoogleToRandomPosition();

    payload.newPosition = getGooglePosition();

    notifyObservers(EVENTS.GOOGLE_JUMPED, payload);
  }
}

function _incrementTime() {
  _state.time++;

  notifyObservers(EVENTS.TIME_CHANGED);
}

function _startGoogleInterval() {
  _googleIntervalId = setInterval(() => {
    if (_state.gameStatus === GAME_STATUSES.IN_PROGRESS) {
      _incrementGooglePoints();
    }
  }, 1000);
}

function _startTimeInterval() {
  _timeIntervalId = setInterval(() => {
    if (_state.gameStatus === GAME_STATUSES.IN_PROGRESS) {
      _incrementTime();
    }
  }, 1000);
}

function _play() {
  clearInterval(_googleIntervalId);
  clearInterval(_timeIntervalId);

  _startGoogleInterval();
  _startTimeInterval();
}

function _catchGoogle(playerId) {
  const points = _state.points.players[playerId];

  points.value++;
  notifyObservers(EVENTS.SCORES_CHANGED);

  if (points.value === _state.settings.pointsToWin) {
    clearInterval(_googleIntervalId);
    clearInterval(_timeIntervalId);

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
  return {
    x: _state.positions.google.x,
    y: _state.positions.google.y,
  };
}

export function getPlayerPositions() {
  return Object.values(_state.positions.players).map((position) => ({ ...position }));
}

export function getSettings() {
  return {
    gridSize: _state.settings.gridSize,
    pointsToWin: _state.settings.pointsToWin,
    pointsToLose: _state.settings.pointsToLose,
  };
}

export function getTime() {
  return _state.time;
}

export function getIsGameInfoHidden() {
  return _state.isGameInfoHidden;
}

// setters
export function setSettings(gridSize, pointsToWin, pointsToLose) {
  _state.settings.gridSize = parseInt(gridSize);
  _state.settings.pointsToWin = parseInt(pointsToWin);
  _state.settings.pointsToLose = parseInt(pointsToLose);
}

export function startGame() {
  _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
  notifyObservers(EVENTS.STATUS_CHANGED);

  _play();
}

export function playAgain() {
  _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
  notifyObservers(EVENTS.STATUS_CHANGED);

  _state.points.google = 0;
  _state.time = 0;
  Object.values(_state.points.players).forEach((player) => (player.value = 0));
  notifyObservers(EVENTS.SCORES_CHANGED);

  _state.positions.google = { x: 0, y: 0 };
  _state.positions.players[1] = { x: 1, y: 1 };
  _state.positions.players[2] = { x: 2, y: 2 };

  _play();
}

function _isWithinBounds({ x, y }) {
  if (x < 0 || x > _state.settings.gridSize - 1) {
    return false;
  }

  if (y < 0 || y > _state.settings.gridSize - 1) {
    return false;
  }

  return true;
}

function _isCellOccupiedByPlayer({ x, y }) {
  if (x === getPlayerPositions()[0].x && y === getPlayerPositions()[0].y) {
    return true;
  }

  if (x === getPlayerPositions()[1].x && y === getPlayerPositions()[1].y) {
    return true;
  }

  return false;
}

function _isCellOccupiedByGoogle({ x, y }) {
  if (x === getGooglePosition().x && y === getGooglePosition().y) {
    return true;
  }

  return false;
}

export function movePlayer(id, direction) {
  const position = _state.positions.players[id];

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
  notifyObservers(EVENTS[`PLAYER${id}_MOVED`]);
}

export function hideGameInfo() {
  _state.isGameInfoHidden = true;

  notifyObservers(EVENTS.GAME_INFO_HIDDEN);
}
