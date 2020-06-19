import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


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


      <Card className="cardBody" >
        <Card.Body>
          <Card.Title>{genre.name}</Card.Title>
          <Card.Text>{genre.description}</Card.Text>
          <Card.Text> Movies from this genre:
              </Card.Text>
          <div >
            {movies.map(movie => {
              if (movie.genre.name === genre.name) {
                return (

                  <Card className="genre-view-card box-shadow" key={movie._id}>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Img variant="top" src={movie.imagePath} />
                    </Link>
                  </Card>

                );
              }
            })}
          </div>
          <Link to={`/`}>
            <Button variant="light">Close</Button>
          </Link>
        </Card.Body>
      </Card>


    );


  }
}

GenreView.propTypes = {
  gerne: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};
