import PropTypes from 'prop-types';
import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function EventCard({
  // game,
  description,
  date,
  time,
  organizer,
}) {
  // const [formInput, setFormInput] = useState(initialState);
  // useEffect(() => {
  //   if (obj.firebaseKey)setFormInput(obj);
  // }, [obj, user]);

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>Date:{date}</Card.Title>
        <Card.Text>Time:{time}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Organizer: {organizer}</Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {
  // game: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  organizer: PropTypes.number.isRequired,
};

export default EventCard;
