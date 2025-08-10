const db = require('../config/db');


const getDetallesByIdTicket = async (id_ticket) => {
    const [result] = await db.query('SELECT * FROM detalles_venta WHERE id_ticket = ?', [id_ticket]);
    return result[0] || null;
}

const insertDetallesVenta = async ({ id_ticket, id_producto, cantidad, precio_unitario}) => {
    const [result] = await db.query(
        'INSERT INTO detalles_venta ( id_ticket, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [id_ticket, id_producto, cantidad, precio_unitario]
    );
    return result;
}

module.exports = {
    getDetallesByIdTicket,
    insertDetallesVenta
}