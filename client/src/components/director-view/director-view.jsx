import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';



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

      <Col>
        <Card className="cardBody" >
          <Card.Body>
            <Card.Title>{director.name}</Card.Title>
            <Card.Text>{director.bio}</Card.Text>
            <Card.Text>Birth Year: {director.birth}</Card.Text>
            <Card.Text> Movies from this director:
              </Card.Text>
            <div >
              {movies.map(movie => {
                if (movie.director.name === director.name) {
                  return (
                    <Col lg={4} key={movie._id}>
                      <Card className="director-view-card box-shadow">
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img variant="top" src={movie.imagePath} />
                        </Link>
                      </Card>
                    </Col>

                  );
                }
              })}
            </div>
            <Link to={`/`}>
              <Button variant="light">Close</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>


    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired
  }).isRequired,
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired
  }).isRequired
};
