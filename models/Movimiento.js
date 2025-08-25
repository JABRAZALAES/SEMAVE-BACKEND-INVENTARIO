const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Producto = require('./Producto');

const Movimiento = sequelize.define('Movimiento', {
  tipo: { // entrada o salida
    type: DataTypes.ENUM('entrada', 'salida'),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'movimientos'
});

// Relación: un movimiento pertenece a un producto
Movimiento.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = Movimiento;
