const db = require('../config/db');

const selectAll = async () => {
    const [result] = await db.query('SELECT * FROM productos');
    return result;
}

const getByCodBarras = async (cod_barras) => {
    const [results] = await db.query('SELECT * FROM productos WHERE cod_barras = ?', [cod_barras]);
    return results || null;
}

module.exports = {
    selectAll,
    getByCodBarras
}