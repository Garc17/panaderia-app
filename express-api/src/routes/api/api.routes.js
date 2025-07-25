const express = require('express');
const router = express.Router();

const productosRoutes = require('./productos.routes');

router.use('/productos', productosRoutes);

module.exports = router;
