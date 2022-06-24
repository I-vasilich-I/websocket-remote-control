import { RawData, WebSocket } from "ws";
import drawHandler from "./drawHandler";
import navigationHandler from "./navigationHandler";
import printScreenHandler from "./printScreenHandler";

const messageHandler = async (data: RawData, ws: WebSocket) => {
  console.log("received: %s", data);

  const command = data.toString();

  if (command.startsWith("mouse")) {
    const res = navigationHandler(command);

    if (res) {
      ws.send(res);
      return;
    }

    ws.send(`${command}\0`);
    return;
  }

  if (command.startsWith("draw")) {
    drawHandler(command);
    ws.send(`${command}\0`);
    return;
  }

  if (command.startsWith("prnt_scrn")) {
    const image = await printScreenHandler();
    if (image) {
      ws.send(`prnt_scrn ${image}\0`);
    }
  }
};

export default messageHandler;
