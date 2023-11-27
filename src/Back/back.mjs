import express from "express";
import mysql from "mysql";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(cors());

const CONEXION = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "utWork",
    port: "3306"
});

CONEXION.connect((error) => {
    if (error) {
        console.log("Error en la conexión a la base de datos:", error);
    } else {
        console.log("Conexión realizada");
    }
});

const secretoJWT = "MiClaveSecreta123$%";

function generarTokenJWT(usuarioId) {
    return jwt.sign({ userId: usuarioId }, secretoJWT, { expiresIn: '1h' });
}

function compararContraseña(contrasena, hash) {
    return bcrypt.compareSync(contrasena, hash);
}

// Ruta para registro de usuarios
app.post("/registro", (req, res) => {
    const { nombre_usuario, email_usuario, contra_usuario } = req.body;
    const hashedPassword = bcrypt.hashSync(contra_usuario, 10);

    const sql = "INSERT INTO usuarios (nombre_usuario, email_usuario, contra_usuario) VALUES (?, ?, ?)";
    CONEXION.query(sql, [nombre_usuario, email_usuario, hashedPassword], (error, resultado) => {
        if (error) {
            console.log("Error en la consulta SQL:", error);
            return res.status(500).json({ Error: "Error al registrar el usuario" });
        }
        const token = generarTokenJWT(resultado.insertId);
        return res.status(201).json({ Estatus: "OK", token });
    });
});

// Ruta para inicio de sesión de usuarios
app.post("/inicio-sesion", (req, res) => {
    const { email_usuario, contra_usuario } = req.body;
    const sql = "SELECT Id_usuario, contra_usuario FROM usuarios WHERE email_usuario=?";
    CONEXION.query(sql, [email_usuario], (error, resultado) => {
        if (error) {
            console.log("Error en la consulta SQL:", error);
            return res.status(500).json({ Error: "Error en la consulta SQL" });
        }

        if (resultado.length === 0) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const usuario = resultado[0];
        if (compararContraseña(contra_usuario, usuario.contra_usuario)) {
            const token = generarTokenJWT(usuario.Id_usuario);
            return res.status(200).json({ Estatus: "OK", token, usuarioId: usuario.Id_usuario });
        } else {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const puerto = 8081;

app.listen(puerto, () => {
    console.log(`Servicio disponible en el puerto ${puerto}`);
});
