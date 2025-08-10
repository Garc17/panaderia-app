const Producto = require('../models/productos.model.js');

const getAll = async (req, res) => {
    try {
        const productos = await Producto.selectAll();
        res.json(productos);    
    } catch (error) {
        console.error('Error en getAll:', error);
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

const getByCodBarras = async (req, res) => {
    try {
        const cod_barras = req.params.cod_barras;

        const productos = await Producto.getByCodBarras(cod_barras);
        if (!productos) {
            return res.status(404).json({ message: 'Producto not found' });
        }

        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getByCodBarras
};
