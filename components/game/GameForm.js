import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createGame, updateGame } from '../../utils/data/gameData';

const GameForm = ({ obj }) => {
  // const [formInput, setFormInput] = useState();
  const { user } = useAuth();
  const router = useRouter();
  // const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({
    skill_level: 1,
    number_of_players: 0,
    title: '',
    maker: '',
    game_type: 0,
  });

  useEffect(() => {
    // setCurrentGame is the same as setFormInput
    if (obj.id)setCurrentGame(obj);
  }, [obj, user]);

  // useEffect(() => {
  //   // TODO: Get the game types, then set the state
  //   getGameTypes().then(setGameTypes);
  // }, []);

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
    if (obj.id) {
      updateGame(currentGame).then(() => router.push('/games'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        number_of_players: Number(currentGame.numberOfPlayers),
        skill_level: Number(currentGame.skillLevel),
        game_type: Number(currentGame.gameTypeId),
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
          <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Game</h2>
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
          <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter Player Name" name="name" value={currentGame.name} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              aria-label="Category"
              name="category"
              type="text"
              value={currentGame.game_type}
              onChange={handleChange}
              className="mb-3"
              required
            >
              <option value="">Category</option>
              <option value="News">News</option>
              <option value="Business">Business</option>
              <option value="Hobbies">Hobbies</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <Button type="submit">{obj.id ? 'Update' : 'Create'} Game</Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
