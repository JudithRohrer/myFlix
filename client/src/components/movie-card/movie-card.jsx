import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Col md={6} lg={4}>
        <Card className="cardBody box-shadow" style={{ maxWidth: "16rem", margin: "0 auto" }} >
          <Card.Img className="cardImage" variant="top" src={movie.imagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="dark">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired
};
