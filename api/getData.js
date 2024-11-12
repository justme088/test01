// api/getData.js

let datos = global.datos || [];
global.datos = datos;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(datos);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
