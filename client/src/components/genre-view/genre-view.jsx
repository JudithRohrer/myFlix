import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



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
      <Container>
        <div className="genre-view">
          <Card className="cardBody" style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>{genre.name}</Card.Title>
              <Card.Text>{genre.description}</Card.Text>
              <Card.Text> Movies from this genre:
              </Card.Text>
              <div className="d-flex row mt-3 ml-1">
                {movies.map(movie => {
                  if (movie.genre.name === genre.name) {
                    return (
                      <div key={movie._id}>
                        <Card className="genre-view-card box-shadow" style={{ width: "10rem" }}>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Img variant="top" src={movie.imagePath} />
                          </Link>
                        </Card>
                      </div>
                    );
                  }
                })}
              </div>
              <Link to={`/`}>
                <Button variant="light">Close</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );


  }
}

GenreView.propTypes = {
  gerne: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};
