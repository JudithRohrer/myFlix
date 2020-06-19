import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


import './movie-view.scss';


export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Col>
        <Card >
          <Card.Img variant="top" src={movie.imagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>Description: {movie.description}</Card.Text>
            <Card.Text>Genre:
            <Link to={`/genres/${movie.genre.name}`}>
                <Button variant="link">{movie.genre.name}</Button>
              </Link>
            </Card.Text>
            <Card.Text>Director:
            <Link to={`/directors/${movie.director.name}`}>
                <Button variant="link">{movie.director.name}</Button>
              </Link>
            </Card.Text>
            <Link to={`/`}>
              <Button variant="light">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    imagePath: PropTypes.string.isRequired
  }).isRequired
};