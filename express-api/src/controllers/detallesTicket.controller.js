const Detalles = require('../models/detallesTicket.model.js');

const getDetallesByIdTicket = async (req, res) => {
    try {
        const id_ticket = req.params.id_ticket;

        const detalle = await Detalles.getDetallesByIdTicket(id_ticket);
        if (!detalle) {
            return res.status(404).json({ message: 'Ticket details not found' });
        }

        res.json(detalle);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const crearDetallesVenta = async (req, res) => {
    try {
        const { id_ticket, id_producto, cantidad, precio_unitario } = req.body;

        // Validación básica
        if (typeof cantidad !== 'number' || typeof precio_unitario !== 'number') {
            return res.status(400).json({ success: false, message: 'Datos inválidos' });
        }

        const result = await Detalles.insertDetallesVenta({ id_ticket, id_producto, cantidad, precio_unitario });

        res.status(201).json({
            success: true,
            message: 'Detalles de la Venta registrados exitosamente',
            detalleVentaId: result.insertId
        });
    } catch (error) {
        console.error('Error al crear los detalles de la venta:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

module.exports = {
    getDetallesByIdTicket,
    crearDetallesVenta
};
