const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 8001;
app.use(cors());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'utWork',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

app.post('/google-login', (req, res) => {
  const { tokenId } = req.body;
  res.status(200).json({ mensaje: 'Inicio de sesión con Google exitoso' });
});

app.post('/guardar-nota', (req, res) => {
  const { noteTitle, noteContent, userId } = req.body;

  if (!noteTitle || !noteContent || !userId) {
    return res.status(400).json({ error: 'Por favor, proporciona el título, contenido y ID del usuario.' });
  }

  const query = 'INSERT INTO notaU (nombreNota, contenidoNota, Id_usuario_Id) VALUES (?, ?, ?)';

  db.query(query, [noteTitle, noteContent, userId], (err, result) => {
    if (err) {
      console.error('Error al guardar la nota en la base de datos:', err);
      return res.status(500).json({ error: 'Error interno al guardar la nota en la base de datos.', details: err.message });
    }

    res.status(201).json({ mensaje: 'Nota guardada con éxito' });
  });
});

app.post('/subir-nota', (req, res) => {
  const { idNota, nombreNota, contenidoNota, autorNota, Id_usuario_Id } = req.body;

  const sql = `INSERT INTO notasP (idNota, nombreNota, contenidoNota, autorNota, Id_usuario_Id) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [idNota, nombreNota, contenidoNota, autorNota, Id_usuario_Id], (err, result) => {
    if (err) {
      console.error('Error al subir la nota:', err);
      res.status(500).send('Error interno del servidor al subir la nota');
    } else {
      console.log('Nota subida exitosamente');
      res.status(200).send('Nota subida exitosamente');
    }
  });
});

app.get('/notas-publicas', (req, res) => {
  const query = 'SELECT * FROM notasP';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener notas públicas:', err);
      return res.status(500).json({ error: 'Error interno al obtener notas públicas.', details: err.message });
    }

    res.status(200).json(result);
  });
});

app.get('/buscar-notas', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Se requiere el ID de usuario.' });
  }

  const query = 'SELECT * FROM notaU WHERE Id_usuario_Id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error al buscar nombres de notas:', err);
      return res.status(500).json({ error: 'Error interno al buscar nombres de notas.', details: err.message });
    }

    res.status(200).json(result);
  });
});
app.post('/registro', async (req, res) => {
  const { email, contraseña, nombre } = req.body;

  if (!email || !contraseña || !nombre) {
    return res.status(400).json({ error: 'Por favor, proporciona correo, contraseña y nombre.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const query = 'INSERT INTO usuarios (email_usuario, contra_usuario, nombre_usuario) VALUES (?, ?, ?)';

    db.query(query, [email, hashedPassword, nombre], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ error: 'Error interno al registrar el usuario en la base de datos.', details: err.message });
      }

      res.status(201).json({ mensaje: 'Registro exitoso' });
    });
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    return res.status(500).json({ error: 'Error interno al registrar el usuario.', details: error.message });
  }
});

app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Por favor, proporciona correo y contraseña.' });
  }

  const query = 'SELECT * FROM usuarios WHERE email_usuario = ?';

  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al realizar la consulta en la base de datos.', details: err.message });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    const usuario = result[0];
    const passwordMatch = await bcrypt.compare(contraseña, usuario.contra_usuario);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario: { Id_usuario: usuario.Id_usuario, nombre: usuario.nombre_usuario, ...usuario } });
  });
});

app.get('/total-usuarios', (req, res) => {
  const query = 'SELECT COUNT(*) as total FROM usuarios';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener el total de usuarios:', err);
      return res.status(500).json({ error: 'Error interno al obtener el total de usuarios.', details: err.message });
    }

    res.status(200).json({ total: result[0].total });
  });
});

app.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error interno al obtener usuarios.', details: err.message });
    }

    res.status(200).json(result);
  });
});
app.put('/actualizar-usuario/:userId', (req, res) => {
  const userId = req.params.userId;
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Por favor, proporciona el nombre y el correo del usuario.' });
  }

  const query = 'UPDATE usuarios SET nombre_usuario = ?, email_usuario = ? WHERE Id_usuario = ?';

  db.query(query, [nombre, correo, userId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      return res.status(500).json({ error: 'Error interno al actualizar el usuario.', details: err.message });
    }

    res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
  });
});

app.delete('/eliminar-usuario/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Desactivar temporalmente las restricciones de clave externa
    await db.query('SET FOREIGN_KEY_CHECKS = 0');

    // Borrar de la tabla usuarios
    await db.query('DELETE FROM usuarios WHERE Id_usuario = ?', [userId]);
    await db.query('DELETE FROM notaU WHERE Id_usuario_Id = ?', [userId]);
    // Restablecer las restricciones de clave externa
    await db.query('SET FOREIGN_KEY_CHECKS = 1');

    res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).json({ error: 'Error interno al eliminar el usuario.', details: error.message });
  }
});

process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión a la base de datos:', err);
    }
    process.exit();
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
