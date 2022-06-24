import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import messageHandler from "../handlers/messageHandler";

dotenv.config();

const WS_PORT = Number(process.env.WS_PORT) || 8080;

const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(`Start backend on the ${WS_PORT} port!`);
});

wss.on("connection", (ws) => {
  ws.on("message", (data) => messageHandler(data, ws));

  ws.on("close", () => {
    console.log("Frontend closed ws connection");
  });

  ws.on("error", (err: Error) => {
    console.error(err);
  });
});

export default wss;
