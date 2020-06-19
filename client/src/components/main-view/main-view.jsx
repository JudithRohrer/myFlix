import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';




import Button from 'react-bootstrap/Button';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-123-db.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onResetSelectedMovie() {
    this.setState({
      selectedMovie: null,
    });
  }

 onRegistered(user) {
    this.setState({
      user,
      register: true
    });
  }*/

  onSignUpClick() {
    this.setState({
      register: false
    })
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.setState({
      user: null,
      register: true
    })

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  onMemberClicked() {
    this.setState({
      user: null,
      register: true
    })
  }

  render() {
    const { movies, user, register } = this.state;

    if (!register && !user) return <RegistrationView onMemberClicked={() => this.onMemberClicked()} />;


    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onSignUpClick={() => this.onSignUpClick()} />;


    return (
      <Router>




        <Link to={'/users/${user}'}>
          <Button
            className="Profile-button"
            variant="info"
          >Your profile
            </Button>
        </Link>

        <Button
          className="Logout-button"
          variant="dark"
          type="submit"
          onClick={() => this.onLoggedOut()}>Logout
            </Button>




        <Route exact path="/" render={() => {
          return movies.map(m => <MovieCard key={m._id} movie={m} />)
        }
        } />

        <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

        <Route path="/genres/:name" render={({ match }) => {
          if (movies.length == 0)
            return <div className="main-view" />
          return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} movies={movies} />
        }} />

        <Route path="/directors/:name" render={({ match }) => {
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



      </Router >
    );
  }
}


