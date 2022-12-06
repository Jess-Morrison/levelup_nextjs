import PropTypes from 'prop-types';
import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteEvent } from '../../utils/data/eventData';

function EventCard({
  organizer,
  description,
  date,
  time,
  id,
  onUpdate,
}) {
  // const [formInput, setFormInput] = useState(initialState);
  // useEffect(() => {
  //   if (obj.firebaseKey)setFormInput(obj);
  // }, [obj, user]);

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${description}?`)) {
      deleteEvent(id).then(() => onUpdate());
      window.location.reload();
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>Date:{date}</Card.Title>
        <Card.Text>Time:{time}</Card.Text>
        <Link href={`/events/edit/${id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Organizer: {organizer}</Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {

  game: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  organizer: PropTypes.number,
  id: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default EventCard;
