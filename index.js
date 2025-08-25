const express = require('express');
const sequelize = require('./db');
const Producto = require('./models/Producto');
const Movimiento = require('./models/Movimiento');
const productoRoutes = require('./routes/productoRoutes');
const movimientoRoutes = require('./routes/movimientoRoutes');
const app = express();
const cors = require('cors');
app.use(express.json());

// Activar CORS para todas las solicitudes
app.use(cors());

// Rutas de productos
app.use('/api/productos', productoRoutes);
// Rutas de movimientos
app.use('/api/movimientos', movimientoRoutes);
// Sincronizar DB
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Base de datos sincronizada con MySQL'))
  .catch(err => console.error('❌ Error al conectar DB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Inventario funcionando 🚀');
});

sequelize.sync().then(() => {
  console.log('✅ DB sincronizada');
  app.listen(3000, '0.0.0.0', () => console.log('Servidor corriendo en http://0.0.0.0:3000'));
});