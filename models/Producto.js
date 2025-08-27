
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Aplicacion = require('./Aplicacion');
const ProductoAplicacion = require('./ProductoAplicacion');

const Producto = sequelize.define('Producto', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'productos'
});

// Relación muchos a muchos usando el modelo intermedio
Producto.belongsToMany(Aplicacion, { through: ProductoAplicacion });
Aplicacion.belongsToMany(Producto, { through: ProductoAplicacion });

module.exports = Producto;
