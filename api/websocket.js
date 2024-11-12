// /api/websocket.js
import { WebSocketServer } from 'ws';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Responder con el WebSocket
    res.status(200).send('WebSocket ready');
  } else {
    res.status(404).send('Not Found');
  }
}

// Manejo de conexiones WebSocket
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: %s', message);
    // Se pueden enviar mensajes de vuelta
    ws.send('Mensaje recibido');
  });
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};
