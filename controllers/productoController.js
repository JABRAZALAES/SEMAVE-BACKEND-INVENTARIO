const productoService = require('../services/productoService');

/**
 * Obtener todos los productos
 */
exports.getAll = async (req, res) => {
  try {
    const productos = await productoService.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener un producto por ID
 */
exports.getById = async (req, res) => {
  try {
    const producto = await productoService.getById(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * Crear un nuevo producto
 */
exports.create = async (req, res) => {
  try {
    console.log('BODY RECIBIDO:', req.body);
    const producto = await productoService.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Actualizar un producto
 */
exports.update = async (req, res) => {
  try {
    const producto = await productoService.update(req.params.id, req.body);
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Eliminar un producto
 */
exports.remove = async (req, res) => {
  try {
    await productoService.remove(req.params.id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
