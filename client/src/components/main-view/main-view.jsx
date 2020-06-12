import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

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

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">

          <Container>
            <Button
              className="Logout-button"
              variant="dark"
              type="submit"
              onClick={() => this.onLoggedOut()}>Logout
          </Button>

            <Row>

              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return movies.map(m => <MovieCard key={m._id} movie={m} />)
              }
              } />

              <Route path="/register" render={() => <RegistrationView />} />
              <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

              <Route path="/genres/:name" render={({ match }) => {
                if (!movies)
                  return <div className="main-view" />
                return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} />
              }} />

              <Route path="/directors/:name" render={({ match }) => {
                if (!movies)
                  return <div className="main-view" />;
                return <DirectorView director={movies.find(m => m.director.name === match.params.name).director} />
              }} />

              <Route path="/users/:username" render={({ match }) => <ProfileView profile={users.find(u = u._id === match.params.userId)} />} />

            </Row>




            {/*        <Row>
              {selectedMovie
                ? <MovieView movie={selectedMovie}
                  onResetSelectedMovie={() => this.onResetSelectedMovie()} />
                : movies.map(movie => (
                  <Col key={movie._id} >
                    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                  </Col>
                ))
              }
            </Row>*/}
          </Container>
        </div>
      </Router>
    );
  }
}


