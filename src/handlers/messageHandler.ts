import { RawData } from "ws";
import drawService from "../services/drawService";
import navigationService from "../services/navigationService";
import printScreenService from "../services/printScreenService";

const messageHandler = async (data: RawData) => {
  console.log("received: %s", data);

  const command = data.toString();

  try {
    if (command.startsWith("mouse")) {
      const res = navigationService(command);

      if (res) {
        return res;
      }

      return `${command}\0`;
    }

    if (command.startsWith("draw")) {
      drawService(command);
      return `${command}\0`;
    }

    if (command.startsWith("prnt_scrn")) {
      const image = await printScreenService();
      if (image) {
        return `prnt_scrn ${image}\0`;
      }
    }
  } catch {
    throw Error("Error in message handler");
  }

  return command;
};

export default messageHandler;
