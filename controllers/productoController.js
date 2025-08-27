const productoService = require('../services/productoService');

/**
 * Obtener todos los productos
 */
exports.getAll = async (req, res) => {
  try {
    const productos = await productoService.getAll();
    // Mapear 'Aplicacions' a 'aplicaciones' en cada producto
    const productosMap = productos.map(p => {
      const { Aplicacions, ...rest } = p.toJSON();
      // Agregar stock_total a cada aplicación
      const aplicaciones = Aplicacions.map(app => {
        const stock_percha = app.ProductoAplicacion?.stock_percha || 0;
        const stock_caja = app.ProductoAplicacion?.stock_caja || 0;
        const linea = app.ProductoAplicacion?.linea || null;
        const codigo_aplicacion = app.ProductoAplicacion?.codigo_aplicacion || null;
        return {
          ...app,
          stock_total: stock_percha + stock_caja,
          linea,
          codigo_aplicacion
        };
      });
      return { ...rest, aplicaciones };
    });
    res.json(productosMap);
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
    // Mapear 'Aplicacions' a 'aplicaciones'
    const { Aplicacions, ...rest } = producto.toJSON();
    const aplicaciones = Aplicacions.map(app => {
      const stock_percha = app.ProductoAplicacion?.stock_percha || 0;
      const stock_caja = app.ProductoAplicacion?.stock_caja || 0;
      const linea = app.ProductoAplicacion?.linea || null;
      const codigo_aplicacion = app.ProductoAplicacion?.codigo_aplicacion || null;
      return {
        ...app,
        stock_total: stock_percha + stock_caja,
        linea,
        codigo_aplicacion
      };
    });
    res.json({ ...rest, aplicaciones });
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
