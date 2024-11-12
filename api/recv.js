// api/recv.js

let datos = global.datos || [];
global.datos = datos;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { s, T, P, H } = req.query;

    if (s && T && P && H) {
      datos.push({ s, T, P, H });
      res.status(200).json({ message: 'Datos agregados con éxito' });
    } else {
      res.status(400).json({ message: 'Faltan campos en el JSON' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
