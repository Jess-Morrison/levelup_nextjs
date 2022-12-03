import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGameById } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getGameById(id).then(setEditGame);
  }, [id]);

  return (
    <div className="edit-form" style={{ height: '45rem', padding: '10%' }}>
      <GameForm obj={editGame} />
    </div>
  );
}
