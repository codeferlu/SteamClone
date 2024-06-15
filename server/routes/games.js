const express = require('express');
const { getAllGames, getGameById, createGame, updateGame, deleteGame } = require('../controllers/games');
const router = express.Router();

// Ruta para obtener todos los juegos
router.get('/', getAllGames);

// Ruta para obtener un juego por su ID
router.get('/:id', getGameById);

router.post('/', createGame);

router.put('/:id', updateGame);

router.delete('/:id', deleteGame);


module.exports = router;
