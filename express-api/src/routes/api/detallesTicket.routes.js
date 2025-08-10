const express = require('express');
const router = express.Router();
const { getDetallesByIdTicket, crearDetallesVenta } = require('../../controllers/detallesTicket.controller');

router.get('/:id_ticket', getDetallesByIdTicket);
router.post('/', crearDetallesVenta);

module.exports = router;
