const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',   // Asegúrate que este es tu host de MySQL
    user: 'root',        // Usuario de MySQL
    password: '',        // Deja vacío si no hay contraseña
    database: 'usuarios' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos!');
});

// Rutas CRUD
// Crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const cliente = req.body;
    const query = 'INSERT INTO clientes SET ?';
    db.query(query, cliente, (err, result) => {
        if (err) {
            console.error('Error al insertar cliente:', err);
            return res.status(500).send(err);
        }
        res.status(201).send({ message: 'Cliente registrado', id: result.insertId });
    });
});

// Leer todos los clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
