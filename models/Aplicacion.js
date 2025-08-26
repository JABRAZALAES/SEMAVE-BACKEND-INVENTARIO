const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Aplicacion = sequelize.define('Aplicacion', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Aplicacion;
