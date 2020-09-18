import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './genre-view.scss';

/**
 * @requires React
 * @requires react-bootstrap/Button
 * @requires prop-types
 * @requires react-router-dom
 * @requires react-bootstrap/Container
 * @requires react-bootstrap/Col
 * @requires react-bootstrap/Card
 * @requires react-bootstrap/Row
 */

/**
 * Genre information of movie
 * @class GenreView
 * @param {string} props - movie.genre
 * @returns {Container} - information about the genre
 */

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    if (!genre) return null;

    return (

      <Col>
        <Card className="cardBody" style={{ maxWidth: "20rem", margin: "0 auto" }}>
          <Card.Body>
            <Card.Title>{genre.name}</Card.Title>
            <Card.Text>{genre.description}</Card.Text>
            <Card.Text> Movies from this genre:
              </Card.Text>
            <Container>
              <Row>
                {movies.map(movie => {
                  if (movie.genre.name === genre.name) {
                    return (
                      <Col sm={6} key={movie._id}>
                        <Card className="genre-view-card box-shadow" key={movie._id}>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Img variant="top" src={movie.imagePath} />
                          </Link>
                        </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Container>
            <br></br>
            <Link to={`/`}>
              <Button variant="light">Close</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    imagePath: PropTypes.string.isRequired
  })).isRequired
};

