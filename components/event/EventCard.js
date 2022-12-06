import PropTypes from 'prop-types';
import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

function EventCard({
  organizer,
  description,
  date,
  time,
  id,
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
        <Link href={`/events/edit/${id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
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
}.isRequired;

export default EventCard;
