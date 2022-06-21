import { RawData, WebSocket } from "ws";
import drawHandler from "./drawHandler";
import navigationHandler from "./navigationHandler";
import printScreenHandler from "./printScreenHandler";

const messageHandler = (data: RawData, ws: WebSocket) => {
  console.log("received: %s", data);

  const command = data.toString();

  if (command.startsWith("mouse")) {
    const res = navigationHandler(command);

    if (res) {
      ws.send(res);
    }

    return;
  }

  if (command.startsWith("draw")) {
    drawHandler(command);
    return;
  }

  if (command.startsWith("prnt_scrn")) {
    printScreenHandler(command);
  }
};

export default messageHandler;
