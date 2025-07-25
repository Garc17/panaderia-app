const Venta = require('../models/tickets.model.js');

const getAll = async (req, res) => {
    try {
        const ventas = await Venta.selectAll();

        const ventasConFechaISO = ventas.map(venta => ({
            ...venta,
            fecha_hora: new Date(venta.fecha_hora).toISOString()
        }));

        res.json(ventasConFechaISO);    
    } catch (error) {
        console.error('Error en getAll:', error);
        res.status(500).json({ message: 'Error al obtener tickets', error: error.message });
    }
};

const getByIdTicket = async (req, res) => {
    try {
        const id_ticket = req.params.id_ticket;

        const venta = await Venta.getByIdTicket(id_ticket);
        if (!venta) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const crearVenta = async (req, res) => {
    try {
        const { id_usuario, total_venta } = req.body;

        // Validación básica
        if (typeof id_usuario !== 'number' || typeof total_venta !== 'number') {
            return res.status(400).json({ success: false, message: 'Datos inválidos' });
        }

        const result = await Venta.insertVenta({ id_usuario, total_venta });

        res.status(201).json({
            success: true,
            message: 'Venta registrada exitosamente',
            ventaId: result.insertId
        });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

module.exports = {
    getAll,
    getByIdTicket,
    crearVenta
};
