let dataStore = []; // Almacenamiento temporal en memoria

// Handler de la API
export default (req, res) => {
  if (req.method === 'GET') {
    // En el caso de una solicitud GET, devolvemos los datos guardados
    res.status(200).json(dataStore);
  } else if (req.method === 'POST') {
    // En el caso de una solicitud POST, agregamos datos al almacenamiento
    const { body } = req;
    // Validación de datos
    if (!body.message) {
      return res.status(400).json({ error: 'El campo "message" es obligatorio.' });
    }
    dataStore.push(body.message); // Guardamos el mensaje
    res.status(200).json({ success: true, message: 'Datos guardados correctamente.' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
