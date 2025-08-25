// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'cWBmqtlOtyOCpipznFJsZHdxgHsfUqsC', {
  host: 'crossover.proxy.rlwy.net',
  port: 35740,
  dialect: 'mysql'
});

module.exports = sequelize;
