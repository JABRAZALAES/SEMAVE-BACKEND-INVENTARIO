
const Producto = require('../models/Producto');
const Aplicacion = require('../models/Aplicacion');

/**
 * Obtener todos los productos
 */
exports.getAll = async () => {
  return await Producto.findAll({ include: Aplicacion });
};

/**
 * Obtener un producto por ID
 */
exports.getById = async (id) => {
  const producto = await Producto.findByPk(id, { include: Aplicacion });
  if (!producto) throw new Error('Producto no encontrado');
  return producto;
};

/**
 * Crear un nuevo producto
 */
exports.create = async (data) => {
  const { codigo, tipo, aplicaciones } = data;
  const producto = await Producto.create({ codigo, tipo });
  if (aplicaciones && Array.isArray(aplicaciones)) {
    for (const nombre of aplicaciones) {
      const [aplicacion] = await Aplicacion.findOrCreate({ where: { nombre } });
      await producto.addAplicacion(aplicacion);
    }
  }
  return await Producto.findByPk(producto.id, { include: Aplicacion });
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
