const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 8001; // o el puerto que prefieras
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'utWork',
});

db.connect((err) => {
  if (err) {
    console.log('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Middleware para configurar Cross-Origin Opener Policy (COOP)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

// Middleware para configurar Cross-Origin Embedder Policy (COEP)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Ruta para manejar la autenticación con Google
app.post('/google-login', async (req, res) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { email, googleId } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const [existingUserRows] = await db.execute('SELECT * FROM usuarios WHERE email_usuario = ?', [email]);

    if (existingUserRows.length > 0) {
      // El usuario ya existe en la base de datos
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    // Insertar el nuevo usuario en la base de datos
    await db.execute('INSERT INTO usuarios (email_usuario, contra_usuario) VALUES (?, ?)', [email, googleId]);

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión con Google:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Por favor, proporciona correo y contraseña.' });
  }

  const query = 'SELECT * FROM usuarios WHERE email_usuario = ? AND contra_usuario = ?';

  db.query(query, [email, contraseña], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al realizar la consulta en la base de datos.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }


    const usuario = result[0];

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
  });
});


app.post('/registro', (req, res) => {
  const { email, contraseña, nombre } = req.body;

  if (!email || !contraseña || !nombre) {
    return res.status(400).json({ error: 'Por favor, proporciona correo, contraseña y nombre.' });
  }

  const query = 'INSERT INTO usuarios (email_usuario, contra_usuario, nombre_usuario) VALUES (?, ?, ?)';

  db.query(query, [email, contraseña, nombre], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar el usuario en la base de datos.' });
    }

    res.status(201).json({ mensaje: 'Registro exitoso' });
  });
});


app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
