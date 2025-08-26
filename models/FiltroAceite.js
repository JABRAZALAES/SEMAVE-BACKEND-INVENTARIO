const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const FiltroAceite = sequelize.define('FiltroAceite', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  aplicacion: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = FiltroAceite;
