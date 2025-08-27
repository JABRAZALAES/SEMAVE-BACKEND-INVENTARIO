

const Producto = require('../models/Producto');
const Aplicacion = require('../models/Aplicacion');
const ProductoAplicacion = require('../models/ProductoAplicacion');

/**
 * Obtener todos los productos
 */

exports.getAll = async () => {
  // Incluir aplicaciones, stocks, línea y código de la relación
  return await Producto.findAll({
    include: {
      model: Aplicacion,
      through: { attributes: ['stock_percha', 'stock_caja', 'linea', 'codigo_aplicacion'] }
    }
  });
};

/**
 * Obtener un producto por ID
 */

exports.getById = async (id) => {
  const producto = await Producto.findByPk(id, {
    include: {
      model: Aplicacion,
      through: { attributes: ['stock_percha', 'stock_caja', 'linea', 'codigo_aplicacion'] }
    }
  });
  if (!producto) throw new Error('Producto no encontrado');
  return producto;
};

/**
 * Crear un nuevo producto
 */

exports.create = async (data) => {
  // aplicaciones debe ser un array de objetos: [{ nombre, stock_percha, stock_caja, linea, codigo_aplicacion }]
  const { codigo, tipo, aplicaciones } = data;
  const producto = await Producto.create({ codigo, tipo });
  if (aplicaciones && Array.isArray(aplicaciones)) {
    for (const app of aplicaciones) {
      const { nombre, stock_percha, stock_caja, linea, codigo_aplicacion } = app;
      const [aplicacion] = await Aplicacion.findOrCreate({ where: { nombre } });
      // Relacionar producto y aplicación con stock inicial, línea y código
      await producto.addAplicacion(aplicacion, { through: {
        stock_percha: stock_percha || 0,
        stock_caja: stock_caja || 0,
        linea: linea,
        codigo_aplicacion: codigo_aplicacion
      }});
    }
  }
  // Devolver producto con aplicaciones, stocks, línea y código
  return await Producto.findByPk(producto.id, {
    include: {
      model: Aplicacion,
      through: { attributes: ['stock_percha', 'stock_caja', 'linea', 'codigo_aplicacion'] }
    }
  });
};

/**
 * Actualizar un producto
 */
exports.update = async (id, data) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');

  // Actualizar campos directos del producto
  await producto.update({ codigo: data.codigo, tipo: data.tipo });

  // Si se envían aplicaciones, sincronizar
  if (data.aplicaciones && Array.isArray(data.aplicaciones)) {
    // Obtener todas las aplicaciones actuales
    const actuales = await producto.getAplicacions();
    // Mapear por nombre para fácil comparación
    const actualesMap = new Map();
    for (const app of actuales) {
      const pa = app.ProductoAplicacion;
      actualesMap.set(app.nombre, { app, pa });
    }

    // Para saber cuáles eliminar
    const nuevasNombres = data.aplicaciones.map(a => a.nombre);

    // Eliminar aplicaciones que ya no están
    for (const [nombre, { app }] of actualesMap.entries()) {
      if (!nuevasNombres.includes(nombre)) {
        await producto.removeAplicacion(app);
      }
    }

    // Agregar o actualizar las aplicaciones enviadas
    for (const nueva of data.aplicaciones) {
      const { nombre, stock_percha, stock_caja, linea, codigo_aplicacion } = nueva;
      const [aplicacion] = await Aplicacion.findOrCreate({ where: { nombre } });
      // Si ya existe la relación, actualizarla
      const prodApp = await ProductoAplicacion.findOne({
        where: { ProductoId: producto.id, AplicacionId: aplicacion.id }
      });
      if (prodApp) {
        await prodApp.update({
          stock_percha: stock_percha || 0,
          stock_caja: stock_caja || 0,
          linea: linea,
          codigo_aplicacion: codigo_aplicacion
        });
      } else {
        // Si no existe, crear la relación
        await producto.addAplicacion(aplicacion, {
          through: {
            stock_percha: stock_percha || 0,
            stock_caja: stock_caja || 0,
            linea: linea,
            codigo_aplicacion: codigo_aplicacion
          }
        });
      }
    }
  }

  // Devolver el producto actualizado con aplicaciones
  return await Producto.findByPk(producto.id, {
    include: {
      model: Aplicacion,
      through: { attributes: ['stock_percha', 'stock_caja', 'linea', 'codigo_aplicacion'] }
    }
  });
};

/**
 * Eliminar un producto
 */
exports.remove = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  return await producto.destroy();
};
