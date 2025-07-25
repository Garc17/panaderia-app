const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

// Solución temporal y segura en desarrollo: permitir cualquier origen
app.use(cors()); // <-- Este middleware debe ir antes de tus rutas

// Rutas de la API
app.use('/api', require('../routes/api/api.routes'));

// 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Fallo 404' });
});

// Errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

module.exports = app;
