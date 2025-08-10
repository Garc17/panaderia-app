const express = require('express');
const router = express.Router();

const productosRoutes = require('./productos.routes');
const ventasRoutes = require('./tickets.routes');
const detallesVentaRoutes = require('./detallesTicket.routes');

router.use('/productos', productosRoutes);
router.use('/ventas', ventasRoutes);
router.use('/detallesVenta', detallesVentaRoutes);

module.exports = router;
