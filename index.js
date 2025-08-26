// server.js
const express = require('express');
const sequelize = require('./db');
const Producto = require('./models/Producto');
const Movimiento = require('./models/Movimiento');
const productoRoutes = require('./routes/productoRoutes');
const movimientoRoutes = require('./routes/movimientoRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());

// Activar CORS para todas las solicitudes
app.use(cors());

// Rutas de productos
app.use('/api/productos', productoRoutes);

// Rutas de movimientos
app.use('/api/movimientos', movimientoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Inventario funcionando 🚀');
});


// Puerto asignado por Railway o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Conectar a la DB y levantar servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado correctamente a Railway');
    // Sincronizar modelos y crear tablas si no existen
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar DB:', err));
