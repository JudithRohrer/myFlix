import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { connect } from 'react-redux';
import { setFavorites } from '../../actions/actions';

import { Link } from 'react-router-dom';

import './movie-card.scss';

class MovieCard extends React.Component {

  /**
     * Function adds movie to database
     * @function addFavMovie
     * @param {object} authData - from login-view
     * @returns {Promise<object>} movie object
     */

  addFavMovie(movieId) {
    axios
      .post(`https://myflix-123-db.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movieId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        console.log(res);
        this.props.setFavorites(res.data.favorites);
        localStorage.setItem('favorites', JSON.stringify(res.data.favorites));
        alert('Movie has been added to favorites!')
      })
      .catch(err => {
        console.log(err);
        alert("Cannot add movie to favorites");
      });
  }



  render() {
    const { movie, favorites } = this.props;

    return (

      <Card className="cardBody box-shadow m-2" style={{ maxWidth: "16rem", margin: "0 auto" }} >
        <Card.Img className="cardImage" variant="top" src={movie.imagePath} />
        <Card.Body>

          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="dark">Open</Button>
          </Link>
          {favorites.find(id => id === movie._id) ? null : (<Button
            className="ml-2"
            variant="outline-info"
            onClick={() => this.addFavMovie(movie._id)}>Add to favorites
          </Button>)}

        </Card.Body>
      </Card>
    );
  }
}

let mapStateToProps = state => {
  return { favorites: state.favorites }
}

let mapDispatchToProps = {
  setFavorites: setFavorites
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired/*,
  favorites: PropTypes.object.isRequired*/
};
