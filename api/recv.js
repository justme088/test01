// api/addData.js

let datos = global.datos || [];
global.datos = datos;

export default (req, res) => {
  if (req.method === 'POST') {
    try {
      const { s, T, P, H } = req.body;

      if (s && T && P && H) {
        datos.push({ s, T, P, H });
        res.status(200).json({ message: 'Datos agregados con éxito' });
      } else {
        console.log("Datos recibidos incompletos:", req.body); // Verifica el cuerpo de la solicitud en caso de error
        res.status(400).json({ message: 'Faltan campos en el JSON', receivedData: req.body });
      }
    } catch (error) {
      console.log("Error en el formato del JSON:", req.body); // Muestra el JSON recibido en caso de formato incorrecto
      res.status(400).json({ message: 'Error en el formato del JSON', receivedData: req.body });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
