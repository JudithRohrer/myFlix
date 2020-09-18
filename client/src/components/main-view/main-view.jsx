import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import { setFavorites } from '../../actions/actions';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';


import './main-view.scss';

import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.props.setUser(JSON.parse(localStorage.getItem('email')));
      this.props.setUser(JSON.parse(localStorage.getItem('birthday')));
      this.props.setFavorites(JSON.parse(localStorage.getItem('favorites')));
      this.getMovies(accessToken);
    }
  }

  /**
   * Function gets movie from database and stores in props
   * @function getMovies
   * @async
   * @param {string} token
   * @returns {Promise<array>} movies
   */

  getMovies(token) {
    axios.get('https://myflix-123-db.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    let { movies, user } = this.props;

    if (!movies) return <div className="main-view" />;

    return (
      <Container>
        <Router basename="/client">

          <Navbar sticky="top" bg="dark" variant="dark">
            <NavbarBrand href="/client">MyFlix</NavbarBrand>

            <Link to={`/users/${localStorage.getItem('user')}`}>
              {localStorage.getItem('user')}
            </Link>

          </Navbar>
          <br></br>
          <br></br>

          <Row>
            <Route exact path="/" render={() => {
              if (!user) return (
                <LoginView getMovies={(token) => this.getMovies(token)} />);
              return <MoviesList movies={movies}
              />;
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />;
              return <RegistrationView />;
            }} />

            <Route path="/movies/:movieId" render={({ match }) => {
              if (!user) return <LoginView getMovies={(token) => this.getMovies(token)} />;
              return <MovieView movie={movies.find(m => m._id === match.params.movieId)} />;
            }} />

            <Route path="/genres/:name" render={({ match }) => {
              if (!user) return <LoginView getMovies={(token) => this.getMovies(token)} />;
              if (movies.length == 0)
                return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} movies={movies} />
            }} />

            <Route path="/directors/:name" render={({ match }) => {
              if (!user) return <LoginView getMovies={(token) => this.getMovies(token)} />;
              if (movies.length == 0)
                return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.director.name === match.params.name).director} movies={movies} />
            }} />

            <Route path="/users/:username" render={() => {
              if (!user) return <LoginView getMovies={(token) => this.getMovies(token)} />;
              return <ProfileView />;
            }}
            />
          </Row>


        </Router >
      </Container >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}




export default connect(mapStateToProps, { setMovies, setUser, setFavorites })(MainView);

MainView.propTypes = {
  setMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  })).isRequired,
}
