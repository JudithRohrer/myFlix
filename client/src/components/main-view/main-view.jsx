import React from 'react';
import axios from 'axios';



import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registerLinkClicked: false
    };
  }

  componentDidMount() {
    axios.get('https://myflix-123-db.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onResetSelectedMovie() {
    this.setState({
      selectedMovie: null,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegLinkClick() {
    this.setState({
      registerLinkClicked: true
    })
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if ({ registerLinkClicked: true }) return <RegistrationView />;

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie
              ? <MovieView movie={selectedMovie}
                onResetSelectedMovie={() => this.onResetSelectedMovie()} />
              : movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>
    );
  }
}


