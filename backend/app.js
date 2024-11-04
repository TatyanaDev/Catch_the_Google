import express from "express";
import cors from "cors";
import { setupRoutes } from "./routes.js";

const app = express();

app.use(cors());

app.use(express.json());

setupRoutes(app);

export default app;
