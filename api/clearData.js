
// api/clearData.js

let datos = global.datos || [];
global.datos = datos;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    datos.length = 0; // Limpia los datos en el array
    res.status(200).json({ message: 'Datos limpiados con éxito' });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
