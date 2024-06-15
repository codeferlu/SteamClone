const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/games'); // Importa las rutas de los juegos
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Asegúrate de que estás utilizando el puerto correcto

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Monta las rutas de autenticación en /api/auth
app.use('/api/auth', authRoutes);

// Monta las rutas de los juegos en /api/games
app.use('/api/games', gameRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
