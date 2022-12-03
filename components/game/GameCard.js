import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const GameCard = ({
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  id,
}) => (
  <Card className="text-center">
    <Card.Header>{title}</Card.Header>
    <Card.Body>
      <Card.Title>By: {maker}</Card.Title>
      <Card.Text>{numberOfPlayers} players needed</Card.Text>
      <Card.Text>Skill Level: {skillLevel}</Card.Text>
      <Link href={`/games/edit/${id}`} passHref>
        <Button variant="info">EDIT</Button>
      </Link>
    </Card.Body>
    <Card.Footer />
  </Card>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default GameCard;
