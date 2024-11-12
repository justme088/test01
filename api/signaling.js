// api/signaling.js

let peers = [];

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        // Almacenar la información del peer
        const { id, ip, port } = req.body;
        peers.push({ id, ip, port });

        res.status(200).json({ message: 'Peer registrado' });
    } else if (req.method === 'GET') {
        // Devolver la lista de peers registrados
        res.status(200).json(peers);
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
};