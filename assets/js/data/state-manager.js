import { GAME_STATUSES, DIRECTIONS } from "./constants.js";

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
};

let _observer = () => {};

export function subscribe(subscriber) {
  _observer = subscriber;
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
  if (_state.gameStatus === GAME_STATUSES.IN_PROGRESS) {
    _state.points.google++;

    if (_state.points.google === _state.settings.pointsToLose) {
      clearInterval(_googleIntervalId);
      clearInterval(_timeIntervalId);

      _state.gameStatus = GAME_STATUSES.LOSE;
    } else {
      _moveGoogleToRandomPosition();
    }

    _observer();
  } else {
    _moveGoogleToRandomPosition();
    _observer();
  }
}

function _incrementTime() {
  _state.time++;

  _observer();
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

  if (points.value === _state.settings.pointsToWin) {
    clearInterval(_googleIntervalId);
    clearInterval(_timeIntervalId);

    _state.gameStatus = GAME_STATUSES.WIN;
  } else {
    _moveGoogleToRandomPosition();
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

// setters
export function setSettings(gridSize, pointsToWin, pointsToLose) {
  _state.settings.gridSize = parseInt(gridSize);
  _state.settings.pointsToWin = parseInt(pointsToWin);
  _state.settings.pointsToLose = parseInt(pointsToLose);
}

export function startGame() {
  _state.gameStatus = GAME_STATUSES.IN_PROGRESS;

  _play();
  _observer();
}

export function playAgain() {
  _state.gameStatus = GAME_STATUSES.IN_PROGRESS;

  _state.points.google = 0;
  _state.time = 0;

  Object.values(_state.points.players).forEach((points) => (points.value = 0));

  _state.positions.google.x = 0;
  _state.positions.google.y = 0;
  _state.positions.players[1].x = 1;
  _state.positions.players[1].y = 1;
  _state.positions.players[2].x = 2;
  _state.positions.players[2].y = 2;

  _play();
  _observer();
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

  if (!_isWithinBounds(newPosition)) {
    return;
  }

  if (_isCellOccupiedByPlayer(newPosition)) {
    return;
  }

  if (_isCellOccupiedByGoogle(newPosition)) {
    _catchGoogle(id);
  }

  _state.positions.players[id] = newPosition;
  _observer();
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
