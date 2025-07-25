const express = require('express');
const router = express.Router();
const { getAll, getByIdTicket, crearVenta } = require('../../controllers/tickets.controller');

router.get('/', getAll);
router.get('/:id_ticket', getByIdTicket);
router.post('/', crearVenta);

module.exports = router;
