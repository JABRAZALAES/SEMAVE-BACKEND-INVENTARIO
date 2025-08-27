
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Producto = require('./Producto');
const Aplicacion = require('./Aplicacion');


const Movimiento = sequelize.define('Movimiento', {
  tipo: { // entrada o salida
    type: DataTypes.ENUM('entrada', 'salida'),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  origen_destino: {
    type: DataTypes.ENUM('percha', 'caja'),
    allowNull: false
  }
}, {
  tableName: 'movimientos'
});

// Relación: un movimiento pertenece a un producto y a una aplicación
Movimiento.belongsTo(Producto, { foreignKey: 'productoId' });
Movimiento.belongsTo(Aplicacion, { foreignKey: 'aplicacionId' });

module.exports = Movimiento;
