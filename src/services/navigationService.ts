import robot from "robotjs";
import { NAVIGATION } from "../constants";

const { UP, DOWN, LEFT, RIGHT, POSITION } = NAVIGATION;

const navigationService = (data: string) => {
  const [command, px] = data.split(" ");

  if (!command) {
    return null;
  }

  let response = null;

  const { x, y } = robot.getMousePos();

  switch (command) {
    case UP:
      robot.moveMouse(x, y - +px);
      break;
    case DOWN:
      robot.moveMouse(x, y + +px);
      break;
    case LEFT:
      robot.moveMouse(x - +px, y);
      break;
    case RIGHT:
      robot.moveMouse(x + +px, y);
      break;
    default:
      response = `${POSITION} ${x},${y}\0`;
      break;
  }

  return response;
};

export default navigationService;
