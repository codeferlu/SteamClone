const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/games'); // Importa las rutas de los juegos

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Define las rutas para los juegos
app.use('/api/games', gameRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
