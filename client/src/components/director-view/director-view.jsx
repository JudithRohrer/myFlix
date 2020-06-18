import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



import './director-view.scss';


export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};

  }

  render() {
    const { movies, director } = this.props;



    if (!director) return null;


    return (
      <Container>
        <div className="director-view">
          <Card className="cardBody" style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>{director.name}</Card.Title>
              <Card.Text>{director.bio}</Card.Text>
              <Card.Text>Birth Year: {director.birth}</Card.Text>
              <Card.Text> Movies from this director:
              </Card.Text>
              <div className="d-flex row mt-3 ml-1">
                {movies.map(movie => {
                  if (movie.director.name === director.name) {
                    return (
                      <div key={movie._id}>
                        <Card className="director-view-card box-shadow" style={{ width: "10rem" }}>
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired
  })
};
