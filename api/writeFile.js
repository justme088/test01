// api/writeFile.js

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, 'prueba.txt'); // Ruta del archivo

  if (req.method === 'POST') {
    // Si el método es POST, intentamos escribir lo que venga en el cuerpo de la solicitud en el archivo
    const { data } = req.body; // Extraemos el 'data' enviado en el POST
    
    if (data) {
      // Escribir en el archivo
      fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al escribir en el archivo', error: err });
        }
        return res.status(200).json({ message: 'Archivo actualizado correctamente' });
      });
    } else {
      return res.status(400).json({ message: 'No se ha proporcionado data' });
    }
  } else if (req.method === 'GET') {
    // Si el método es GET, leer el archivo y devolver su contenido
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error al leer el archivo', error: err });
      }
      return res.status(200).json({ content: data });
    });
  } else {
    // Si no es ni POST ni GET, devolver un método no permitido
    return res.status(405).json({ message: 'Método no permitido' });
  }
};
