import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const GameForm = ({ obj }) => {
  // const [formInput, setFormInput] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const [gameTypes, setGameTypes] = useState([]);
  console.warn(gameTypes);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({
    id: '',
    skill_level: 1,
    number_of_players: 0,
    title: '',
    maker: '',
    game_type: 0,
  });

  useEffect(() => {
    // setCurrentGame is the same as setFormInput
    if (obj)setCurrentGame(obj);
  }, [obj, user]);

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj) {
      updateGame(currentGame).then(() => router.push('/games'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        number_of_players: Number(currentGame.number_of_players),
        skill_level: Number(currentGame.skill_level),
        game_type: Number(currentGame.game_type),
        user_id: user.uid,
      };
      // Send POST request to your API
      createGame(game).then(() => {
        router.push('/games');
      });
    }
  };

  // Send POST request to your API
  // createGame(game).then(() => router.push('/games'));
  // };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          {/* <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Game</h2> */}
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} className="mb-3" />
          <FloatingLabel controlId="floatingInput1" label="Game Maker" className="mb-3">
            <Form.Control type="text" placeholder="Enter Maker Name" name="maker" value={currentGame.maker} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Number of Players" className="mb-3">
            <Form.Control type="text" placeholder="Number of Players" name="number_of_players" value={currentGame.number_of_players} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Skill Level" className="mb-3">
            <Form.Control type="text" placeholder="Skill Level" name="skill_level" value={currentGame.skill_level} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              aria-label="Game Type"
              name="game_type"
              type="text"
              value={currentGame.game_type}
              onChange={handleChange}
              className="mb-3"
              required
            >
              <option value="">Game Type</option>
              {
            gameTypes.map((gameType) => (
              <option
                key={gameType.id}
                value={gameType.id}
                selected={gameType.label}
              >
                {gameType.label}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <Button type="submit">{obj.id ? 'Update' : 'Create'} Game</Button> */}
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    // game_type: PropTypes.string,
    id: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
// GameForm.defaultProps = {
//   obj: initialState,
// };
export default GameForm;
