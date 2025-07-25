const express = require('express');
const router = express.Router();
const { getAll, getByCodBarras } = require('../../controllers/productos.controller');

router.get('/', getAll);
router.get('/:cod_barras', getByCodBarras);


module.exports = router;
