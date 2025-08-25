const movimientoService = require('../services/movimientoService');

/**
 * Crear un movimiento
 */
exports.create = async (req, res) => {
  try {
    const movimiento = await movimientoService.create(req.body);
    res.status(201).json(movimiento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Obtener todos los movimientos
 */
exports.getAll = async (req, res) => {
  try {
    const movimientos = await movimientoService.getAll();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener movimiento por ID
 */
exports.getById = async (req, res) => {
  try {
    const movimiento = await movimientoService.getById(req.params.id);
    res.json(movimiento);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
