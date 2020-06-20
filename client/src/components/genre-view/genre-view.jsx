import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import './genre-view.scss';


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
        <Card className="cardBody" style={{ width: "20rem" }}>
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
  movies: PropTypes.shape({
    imagePath: PropTypes.string.isRequired
  }).isRequired
};
