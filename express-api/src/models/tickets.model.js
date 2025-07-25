const db = require('../config/db');

const selectAll = async () => {
    const [result] = await db.query('SELECT * FROM ventas');
    return result;
}

const getByIdTicket = async (id_ticket) => {
    const [result] = await db.query('SELECT * FROM ventas WHERE id_ticket = ?', [id_ticket]);
    return result[0] || null;
}

const insertVenta = async ({ id_usuario, total_venta}) => {
    const [result] = await db.query(
        'INSERT INTO ventas ( id_usuario, fecha_hora, total_venta) VALUES (?, CURRENT_TIMESTAMP, ?)',
        [id_usuario, total_venta]
    );
    return result;
}

module.exports = {
    selectAll,
    getByIdTicket,
    insertVenta
}