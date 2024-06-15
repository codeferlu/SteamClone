const pool = require('../config/database');

const getAllGames = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM games');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting games:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getGameById = async (req, res) => {
  const gameId = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM games WHERE id = $1', [gameId]);
    client.release();
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error(`Error getting game with ID ${gameId}:`, error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createGame = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO games (title, description, price, imageUrl) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, price, imageUrl]
    );
    const game = result.rows[0];
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGame = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const result = await pool.query(
      'UPDATE games SET title = $1, description = $2, price = $3, imageUrl = $4 WHERE id = $5 RETURNING *',
      [title, description, price, imageUrl, req.params.id]
    );
    const game = result.rows[0];
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [req.params.id]);
    const game = result.rows[0];
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllGames, getGameById, createGame, updateGame, deleteGame };
