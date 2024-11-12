// api/hello.js

module.exports = (req, res) => {
  if (req.method === 'POST') {
    // Obtener los datos enviados en el cuerpo del POST
    let data = req.body;

    // Comprobar si los datos contienen "test=data" y devolver "Hola" o "Naonao"
    if (data && data.test === 'data') {
      res.status(200).send('Hola');
    } else {
      res.status(200).send('Naonao');
    }
  } else {
    // Si la solicitud no es POST, se responde con un error
    res.status(405).send('Método no permitido');
  }
};
