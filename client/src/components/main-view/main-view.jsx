import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';


import './main-view.scss';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


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
        this.props.setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
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
      user: null
    })

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }



  render() {
    let { movies } = this.props;
    let { user } = this.state;



    if (!movies) return <div className="main-view" />;



    return (
      <Container>
        <Router>

          <Navbar sticky="top" bg="dark" variant="dark">
            <NavbarBrand href="/">MyFlix</NavbarBrand>

            <Link to={`/users/${user}`}>
              <Button
                className="Profile-button"
                variant="dark"
              >Profile
                </Button>
            </Link>

            <Button
              className="Logout-button"
              variant="dark"
              type="submit"
              onClick={() => this.onLoggedOut()}>Logout
                </Button>


          </Navbar>
          <br></br>
          <br></br>

          <Row>
            <Route exact path="/" render={() => {
              if (!user) return (
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />);
              return <MoviesList movies={movies}
              />;
            }} />

            <Route path="/register" render={() => <RegistrationView />} />

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
          </Row>


        </Router >
      </Container >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
