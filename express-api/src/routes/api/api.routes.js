const express = require('express');
const router = express.Router();

const productosRoutes = require('./productos.routes');
const ventasRoutes = require('./tickets.routes');

router.use('/productos', productosRoutes);
router.use('/ventas', ventasRoutes);

module.exports = router;
