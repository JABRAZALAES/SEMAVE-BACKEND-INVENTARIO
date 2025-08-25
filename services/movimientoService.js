const Movimiento = require('../models/Movimiento');
const Producto = require('../models/Producto');

/**
 * Registrar un movimiento (entrada o salida)
 * data: { productoId, tipo, cantidad }
 */
exports.create = async (data) => {
  const producto = await Producto.findByPk(data.productoId);
  if (!producto) throw new Error('Producto no encontrado');

  // Ajustar stock según tipo
  if (data.tipo === 'entrada') {
    producto.stock += data.cantidad;
  } else if (data.tipo === 'salida') {
    if (producto.stock < data.cantidad) throw new Error('Stock insuficiente');
    producto.stock -= data.cantidad;
  } else {
    throw new Error('Tipo de movimiento inválido');
  }

  await producto.save();
  return await Movimiento.create(data);
};

/**
 * Obtener todos los movimientos
 */
exports.getAll = async () => {
  return await Movimiento.findAll({
    include: Producto
  });
};

/**
 * Obtener un movimiento por ID
 */
exports.getById = async (id) => {
  const movimiento = await Movimiento.findByPk(id, { include: Producto });
  if (!movimiento) throw new Error('Movimiento no encontrado');
  return movimiento;
};
