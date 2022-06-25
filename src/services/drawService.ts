import { mouseToggle, moveMouseSmooth, getMousePos } from "robotjs";
import { DRAWING } from "../constants";

const { CIRCLE, RECTANGLE, SQUARE } = DRAWING;

const drawRectangle = (width: number, height: number) => {
  const { x, y } = getMousePos();

  mouseToggle("down");
  moveMouseSmooth(x, y + height);
  moveMouseSmooth(x + width, y + height);
  moveMouseSmooth(x + width, y);
  moveMouseSmooth(x, y);
  mouseToggle("up");
};

const curryCircleCoordinates = (radius: number) => {
  const { x, y } = getMousePos();
  const h = x - radius * Math.cos(0);
  const k = y - radius * Math.sin(0);

  return (theta: number) => {
    const rad = (theta * Math.PI) / 180;
    const nextX = h + radius * Math.cos(rad);
    const nextY = k + radius * Math.sin(rad);
    return [nextX, nextY];
  };
};

const drawCircle = (radius: number) => {
  mouseToggle("down");

  const getCircleCoordinate = curryCircleCoordinates(radius);
  let theta = 15;

  while (theta <= 360) {
    const [nextX, nextY] = getCircleCoordinate(theta);
    moveMouseSmooth(nextX, nextY);
    theta += 15;
  }

  mouseToggle("up");
};

const drawService = (data: string) => {
  const [command, width, height] = data.split(" ");

  if (!command) {
    return;
  }

  switch (command) {
    case CIRCLE:
      drawCircle(+width);
      break;
    case RECTANGLE:
      drawRectangle(+width, +height);
      break;
    case SQUARE:
      drawRectangle(+width, +width);
      break;
    default:
      break;
  }
};

export default drawService;
