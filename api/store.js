let dataStore = {
  message1: "Mensaje por defecto 1",  // Valor inicial para message1
  message2: "Mensaje por defecto 2",  // Valor inicial para message2
  message3: "Mensaje por defecto 3"   // Valor inicial para message3
};

// Handler de la API
export default (req, res) => {
  if (req.method === 'GET') {
    // En el caso de una solicitud GET, devolvemos los tres mensajes almacenados
    res.status(200).json(dataStore);
  } else if (req.method === 'POST') {
    const { message1, message2, message3 } = req.body;

    // Actualizar solo los mensajes que hayan sido enviados
    if (message1 !== undefined) {
      dataStore.message1 = message1;
    }
    if (message2 !== undefined) {
      dataStore.message2 = message2;
    }
    if (message3 !== undefined) {
      dataStore.message3 = message3;
    }

    res.status(200).json({ success: true, message: 'Datos actualizados correctamente.' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
