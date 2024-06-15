const express = require('express');
const { getAllGames, getGameById, createGame, updateGame, deleteGame } = require('../controllers/games');
const router = express.Router();

router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

module.exports = router;
