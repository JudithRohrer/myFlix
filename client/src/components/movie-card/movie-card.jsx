import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {


  addFavMovie(movieId) {
    axios
      .post(`https://myflix-123-db.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movieId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        console.log(res);
        alert('Movie has been added to favorites!')
      })
      .catch(err => {
        console.log(err);
        alert("Cannot add movie to favorites");
      });
  }



  render() {
    const { movie } = this.props;

    return (

      <Card className="cardBody box-shadow m-2" style={{ maxWidth: "16rem", margin: "0 auto" }} >
        <Card.Img className="cardImage" variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="dark">Open</Button>
          </Link>
          <Button
            className="ml-2"
            variant="outline-info"
            onClick={() => this.addFavMovie(movie._id)}>Add to favorites
          </Button>

        </Card.Body>
      </Card>
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
