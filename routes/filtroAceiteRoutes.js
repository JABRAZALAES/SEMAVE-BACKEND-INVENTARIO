const express = require('express');
const router = express.Router();
const filtroAceiteController = require('../controllers/filtroAceiteController');

// Crear filtro de aceite
router.post('/', filtroAceiteController.createFiltro);
// Listar filtros de aceite
router.get('/', filtroAceiteController.getFiltros);

module.exports = router;
