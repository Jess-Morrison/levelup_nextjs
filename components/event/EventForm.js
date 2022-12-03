import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const EventForm = ({ obj }) => {
  // const [formInput, setFormInput] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const [games, setGames] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState({
    description: '',
    date: '',
    time: '',
    game: '',
    organizer: '',
  });

  useEffect(() => {
    // setCurrentGame is the same as setFormInput
    if (obj)setCurrentEvent(obj);
  }, [obj, user]);

  useEffect(() => {
    // TODO: Get the games, then set the state
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj) {
      updateEvent(currentEvent).then(() => router.push('/events'));
    } else {
      const event = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: Number(currentEvent.game),
        organizer: user.uid,
        // why user id? and what is Number()?
      };
      // Send POST request to your API
      createEvent(event).then(() => {
        router.push('/events');
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
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} className="mb-3" />
          <FloatingLabel controlId="floatingInput1" label="Date" className="mb-3">
            <Form.Control type="text" placeholder="Date" name="date" value={currentEvent.date} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Time" className="mb-3">
            <Form.Control type="text" placeholder="Time" name="time" value={currentEvent.time} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              aria-label="Game"
              name="game"
              type="text"
              value={currentEvent.game}
              onChange={handleChange}
              className="mb-3"
              required
            >
              <option value="">Game</option>
              {
            games.map((game) => (
              <option
                key={game.id}
                value={game.id}
                selected={game.title}
              >
                {game.title}
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

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
// GameForm.defaultProps = {
//   obj: initialState,
// };
export default EventForm;
