const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const ProductoAplicacion = sequelize.define('ProductoAplicacion', {
  stock_percha: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  stock_caja: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  linea: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codigo_aplicacion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'ProductoAplicacion'
});

module.exports = ProductoAplicacion;
