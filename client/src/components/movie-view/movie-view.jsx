import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

import { MainView } from '../main-view/main-view';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="FormMovie">
        <Card style={{ width: '28rem' }}>
          <Card.Img variant="top" src={movie.imagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>Description: {movie.description}</Card.Text>
            <Card.Text>Genre: {movie.genre.name}</Card.Text>
            <Card.Text>Director: {movie.director.name}</Card.Text>
            <Button variant="light" onClick={() => this.props.onResetSelectedMovie()}>Back</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired
    }),
    imagePath: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired,
  onResetSelectedMovie: PropTypes.func.isRequired
};