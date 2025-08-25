const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimientoController');

// Crear movimiento (entrada o salida)
router.post('/', movimientoController.create);

// Obtener todos los movimientos
router.get('/', movimientoController.getAll);

// Obtener movimiento por ID
router.get('/:id', movimientoController.getById);

module.exports = router;
