import { getPoints, getGameStatus, getGridSize, getGooglePosition, getPlayerPositions, getSettings, getGameStartTime, getIsGameInfoHidden, getIsSoundOn, setSettings, startGame, playAgain, movePlayer, hideGameInfo, toggleSound } from "./state-manager.js";

const routes = [
  { method: "get", path: "/getPoints", handler: getPoints },
  { method: "get", path: "/getGameStatus", handler: getGameStatus },
  { method: "get", path: "/getGridSize", handler: getGridSize },
  { method: "get", path: "/getGooglePosition", handler: getGooglePosition },
  { method: "get", path: "/getPlayerPositions", handler: getPlayerPositions },
  { method: "get", path: "/getSettings", handler: getSettings },
  { method: "get", path: "/getGameStartTime", handler: getGameStartTime },
  { method: "get", path: "/getIsGameInfoHidden", handler: getIsGameInfoHidden },
  { method: "get", path: "/getIsSoundOn", handler: getIsSoundOn },
  { method: "put", path: "/setSettings", handler: ({ body }) => setSettings(body.gridSize, body.pointsToWin, body.pointsToLose) },
  { method: "post", path: "/startGame", handler: startGame },
  { method: "post", path: "/playAgain", handler: playAgain },
  { method: "put", path: "/movePlayer", handler: ({ body }) => movePlayer(body.id, body.direction) },
  { method: "put", path: "/hideGameInfo", handler: hideGameInfo },
  { method: "put", path: "/toggleSound", handler: toggleSound },
];

const createRoute = (app, method, path, handler) => {
  app[method](path, async (req, res) => {
    try {
      const result = await handler(req, res);

      if (method === "get") {
        res.send({ data: result });
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      console.error(`Error handling ${method.toUpperCase()} ${path}:`, error);
      res.status(500).send({ error: "Internal server error" });
    }
  });
};

export const setupRoutes = (app) => routes.forEach(({ method, path, handler }) => createRoute(app, method, path, handler));
