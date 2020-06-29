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

import Button from 'react-bootstrap/Button';
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
      this.props.setFavorites(JSON.parse(localStorage.getItem('favorites')));
      this.getMovies(accessToken);
    }
  }

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
        <Router>

          <Navbar sticky="top" bg="dark" variant="dark">
            <NavbarBrand href="/">MyFlix</NavbarBrand>

            <Link to={`/users/${user}`}>
              <Button
                className="Profile-button"
                variant="outline-light"
              >{localStorage.getItem('user')}
              </Button>
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
              if (!user || user.length == 0)
                return <div className="main-view" />;
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
  /*user: PropTypes.object.isRequired*/
}
