const FiltroAceite = require('../models/FiltroAceite');

// Crear un nuevo filtro de aceite
exports.createFiltro = async (req, res) => {
  try {
    const { codigo, aplicacion } = req.body;
    const filtro = await FiltroAceite.create({ codigo, aplicacion });
    res.status(201).json(filtro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los filtros de aceite
exports.getFiltros = async (req, res) => {
  try {
    const filtros = await FiltroAceite.findAll();
    res.json(filtros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
