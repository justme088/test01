// api/addData.js

let datos = global.datos || [];
global.datos = datos;

export default (req, res) => {
  if (req.method === 'POST') {
    try {
      const { s, T, P, H } = req.body;

      // Verificación robusta para asegurarse de que cada clave está definida
      if ([s, T, P, H].every(value => value !== undefined && value !== null)) {
        datos.push({ s, T, P, H });
        res.status(200).json({ message: 'Datos agregados con éxito' });
      } else {
        console.log("Datos recibidos incompletos:", req.body);
        res.status(400).json({ message: 'Faltan campos en el JSON', receivedData: req.body });
      }
    } catch (error) {
      console.log("Error en el formato del JSON:", req.body);
      res.status(400).json({ message: 'Error en el formato del JSON', receivedData: req.body });
    }
  } else if (req.method === 'GET') {
    const { clear } = req.query;

    if (clear) {
      // Si el parámetro "clear" está presente, limpia los datos
      datos = [];
      global.datos = datos; // Actualiza la variable global para asegurarse de que se refleje el cambio
      res.status(200).json({ message: 'Datos borrados exitosamente' });
    } else {
      // Si no se proporciona "clear", convierte los datos a CSV y envíalos
      const csvHeader = 's,T,P,H\n';
      const csvData = datos.map(row => `${row.s},${row.T},${row.P},${row.H}`).join('\n');
      const csvContent = csvHeader + csvData;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=datos.csv');
      res.status(200).send(csvContent);
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
