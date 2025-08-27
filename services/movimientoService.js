
const Movimiento = require('../models/Movimiento');
const Producto = require('../models/Producto');
const Aplicacion = require('../models/Aplicacion');
const ProductoAplicacion = require('../models/ProductoAplicacion');

/**

/**

/**
 * Registrar un movimiento (entrada o salida)
 * data: { productoId, aplicacionId, tipo, cantidad, origen_destino }
 * origen_destino: 'percha' o 'caja'
 */
exports.create = async (data) => {
  const { productoId, aplicacionId, tipo, cantidad, origen_destino } = data;
  const producto = await Producto.findByPk(productoId);
  if (!producto) throw new Error('Producto no encontrado');
  const aplicacion = await Aplicacion.findByPk(aplicacionId);
  if (!aplicacion) throw new Error('Aplicación no encontrada');

  // Buscar la relación producto-aplicación
  const prodApp = await ProductoAplicacion.findOne({
    where: { ProductoId: productoId, AplicacionId: aplicacionId }
  });
  if (!prodApp) throw new Error('La relación producto-aplicación no existe');

  if (!['percha', 'caja'].includes(origen_destino)) {
    throw new Error('origen_destino debe ser "percha" o "caja"');
  }

  // Ajustar stock según tipo y origen_destino
  if (tipo === 'entrada') {
    if (origen_destino === 'percha') {
      prodApp.stock_percha += cantidad;
    } else {
      prodApp.stock_caja += cantidad;
    }
  } else if (tipo === 'salida') {
    if (origen_destino === 'percha') {
      if (prodApp.stock_percha < cantidad) throw new Error('Stock insuficiente en percha');
      prodApp.stock_percha -= cantidad;
    } else {
      if (prodApp.stock_caja < cantidad) throw new Error('Stock insuficiente en caja');
      prodApp.stock_caja -= cantidad;
    }
  } else {
    throw new Error('Tipo de movimiento inválido');
  }

  await prodApp.save();
  // Registrar el movimiento con productoId, aplicacionId, tipo, cantidad y origen_destino
  return await Movimiento.create({ productoId, aplicacionId, tipo, cantidad, origen_destino });
};

/**
 * Obtener todos los movimientos
 */


exports.getAll = async () => {
  const Producto = require('../models/Producto');
  const Aplicacion = require('../models/Aplicacion');
  return await Movimiento.findAll({
    include: [
      {
        model: Producto,
        attributes: ['id', 'codigo', 'tipo']
      },
      {
        model: Aplicacion,
        attributes: ['id', 'nombre']
      }
    ]
  });
};

/**
 * Obtener un movimiento por ID
 */


exports.getById = async (id) => {
  const Producto = require('../models/Producto');
  const Aplicacion = require('../models/Aplicacion');
  const movimiento = await Movimiento.findByPk(id, {
    include: [
      {
        model: Producto,
        attributes: ['id', 'codigo', 'tipo']
      },
      {
        model: Aplicacion,
        attributes: ['id', 'nombre']
      }
    ]
  });
  if (!movimiento) throw new Error('Movimiento no encontrado');
  return movimiento;
};
