import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await axios.get(`/api/games/${id}`);
      setGame(response.data);
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{game.title}</h2>
      <img src={game.imageUrl} className="img-fluid" alt={game.title} />
      <p>{game.description}</p>
      <p>Price: ${game.price}</p>
      <button className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default GameDetail;
