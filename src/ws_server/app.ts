import dotenv from "dotenv";
import { createWebSocketStream, WebSocketServer } from "ws";
import errorHandler from "../handlers/errorHandler";
import messageHandler from "../handlers/messageHandler";

dotenv.config();

const WS_PORT = Number(process.env.WS_PORT) || 8080;

const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(`Start backend on the ${WS_PORT} port!`);
});

wss.on("connection", (ws) => {
  const duplex = createWebSocketStream(ws, {
    decodeStrings: false,
  });

  duplex.on("data", async (data) => duplex.write(await messageHandler(data), errorHandler));

  ws.on("close", () => {
    console.log("Frontend closed ws connection");
  });

  ws.on("error", errorHandler);

  process.on("SIGINT", () => {
    process.stdout.write("\nClosing websocket...\n");
    wss.close();
    process.exit(0);
  });
});

export default wss;
