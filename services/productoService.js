const Producto = require('../models/Producto');

/**
 * Obtener todos los productos
 */
exports.getAll = async () => {
  return await Producto.findAll();
};

/**
 * Obtener un producto por ID
 */
exports.getById = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  return producto;
};

/**
 * Crear un nuevo producto
 */
exports.create = async (data) => {
  return await Producto.create(data);
};

/**
 * Actualizar un producto
 */
exports.update = async (id, data) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  return await producto.update(data);
};

/**
 * Eliminar un producto
 */
exports.remove = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  return await producto.destroy();
};
