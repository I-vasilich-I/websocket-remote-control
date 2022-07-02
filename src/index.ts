import dotenv from "dotenv";
import httpServer from "./http_server/index";
import "./ws_server/app";

dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT || 3000;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start frontend on the ${HTTP_PORT} port! http://localhost:${HTTP_PORT}/`);
});
