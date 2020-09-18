import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * Updates the state to show what a user has entered into the search bar filter in the mainview
 * @function MoviesList
 * @params props
 */

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movie-list">
      <Container className="display-flex">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        <Row className="justify-content-center">
          {filteredMovies.map((m) => (<MovieCard key={m._id} movie={m} />))}
        </Row>
      </Container>
    </div>
  );
}


export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  })).isRequired,
  visibilityFilter: PropTypes.string.isRequired
}