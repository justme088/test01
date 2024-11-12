// /api/websocket.js
import { WebSocketServer } from 'ws';

let clients = []; // Para almacenar las conexiones activas

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).send('WebSocket server running');
    } else {
        res.status(404).send('Not Found');
    }
}

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', ws => {
    console.log('Nuevo cliente conectado');
    clients.push(ws); // Añadir nuevo cliente a la lista

    ws.on('message', message => {
        console.log('Mensaje recibido:', message);
        // Reenviar el mensaje a todos los clientes conectados
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message); // Reenviar el mensaje
            }
        });
    });

    ws.on('close', () => {
        // Eliminar cliente desconectado
        clients = clients.filter(client => client !== ws);
    });
});

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
};
