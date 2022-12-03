import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  // console.warn(typeof games);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      <article className="games">
        <h1>Games</h1>
        {games.map((game) => (
          <section key={`game--${game.id}`} className="game">
            <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} id={game.id} game_type={game.game_type.id} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
