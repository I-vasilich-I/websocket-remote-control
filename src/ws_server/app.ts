import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';

dotenv.config();

const WS_PORT = Number(process.env.WS_PORT) || 8080;

export const wss = new WebSocketServer({ port: WS_PORT });

wss.on('listening', () => {
  console.log(`Start backend on the ${WS_PORT} port!`);
})

wss.on('connection', (ws) => {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
