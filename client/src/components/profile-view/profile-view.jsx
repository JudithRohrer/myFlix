import React from 'react';
import axios from 'axios';

import { setUser, setFavorites } from '../../actions/actions';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';



class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      usernameField: '',
      passwordField: '',
      emailField: '',
      birthdayField: ''
    };
  }

  /* componentDidMount() {
     let accessToken = localStorage.getItem('token');
     if (accessToken !== null) {
       this.setState({
         user: localStorage.getItem('user')
       });
       this.getUsers(accessToken);
     }
   }*/



  /*getUsers(token) {
    axios.get(`https://myflix-123-db.herokuapp.com/users/${localStorage.getItem('user')}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday ? response.data.birthday.substr(0, 10) : " ",
          favorites: response.data.favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/


  setUsernameField(NewUsername) {
    this.setState({
      usernameField: NewUsername
    });
  }

  setPasswordField(NewPassword) {
    this.setState({
      passwordField: NewPassword
    });
  }

  setEmailField(NewEmail) {
    this.setState({
      emailField: NewEmail
    });
  }

  setBirthdayField(NewBirthday) {
    this.setState({
      birthdayField: NewBirthday
    });
  }



  handleUpdate() {
    axios.put(`https://myflix-123-db.herokuapp.com/users/${localStorage.getItem('user')}`, {
      username: this.state.usernameField,
      password: this.state.passwordField,
      email: this.state.emailField,
      birthday: this.state.birthdayField
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        const data = response.data;
        localStorage.setItem('user', data.username);
        localStorage.setItem('email', JSON.stringify(data.email));
        localStorage.setItem('birthday', JSON.stringify(data.user.birthday.substring(0, 10)));
        this.props.setUser(data.user.username);
        this.props.setUser(data.user.password);
        this.props.setUser(data.user.email);
        this.props.setUser(data.user.birthday);
        console.log(data);
        alert('Your profile has been updated successfully');
      })
      .catch(e => {
        console.log('error updating the user')
      });
  };

  deleteFavMovie(movieId) {
    axios
      .delete(`https://myflix-123-db.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        this.props.setFavorites(res.data.favorites);
        localStorage.setItem('favorites', JSON.stringify(res.data.favorites));
      })
      .catch(function () {
        console.log("Cannot delete movie from list");
      });
  }

  onLoggedOut() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    this.props.setUser(null);
    this.props.setFavorites([]);
  }

  deRegister() {
    axios.delete(`https://myflix-123-db.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('User has been successfully deleted!');
        this.onLoggedOut();
        console.log('user deleted');
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {

    const { username, email, birthday } = this.state;
    const { movies, favorites } = this.props;

    let detailedFavorites = movies.filter(movie => {
      return favorites.includes(movie._id);
    });


    return (

      <Col>
        <Link to={`/`}>
          <Button variant="dark">Back</Button>
        </Link>
        <Button
          className="Logout-button float-right"
          variant="outline-secondary"
          type="submit"
          onClick={() => this.onLoggedOut()}>Logout
            </Button>
        <br></br>
        <br></br>
        <Card className="Profile-Card">
          <Card.Body>
            <br></br>
            <h2>{localStorage.getItem('user')}</h2>
            <br></br>
            <Card.Text>Password: ######</Card.Text>
            <Card.Text>Email: {localStorage.getItem('email')}</Card.Text>
            <Card.Text>Birthday: {localStorage.getItem('birthday')}</Card.Text>
            <br></br>
          </Card.Body>
          <Card.Footer>
            <h5>{localStorage.getItem('user')}'s favorite movies: </h5>
            <Container>
              <Row>
                {favorites == 0 && <h2> No favorites yet!</h2>}
                {favorites &&
                  detailedFavorites.map(movie => {
                    return (
                      <Col lg={2} key={movie._id}>
                        <Card className="profile-view-card" style={{ maxWidth: "10rem", margin: "0 auto" }}>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Img variant="top" src={movie.imagePath} />
                          </Link>
                          <Button variant="outline-danger" size="sm" onClick={() => this.deleteFavMovie(movie._id)}>Remove from list</Button>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </Container>
            <br></br>

          </Card.Footer>
        </Card>
        <br></br>
        <Button type="button" className="float-right" variant="danger" size="md" onClick={() => this.deRegister()}>Delete my account</Button>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Form className="registrationForm">
          <Form.Group controlId="formBasicUsername">
            <h3>Need to update your user information?</h3>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={this.state.usernameField}
              onChange={e => this.setUsernameField(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              value={this.state.passwordField}
              onChange={e => this.setPasswordField(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.emailField}
              onChange={e => this.setEmailField(e.target.value)}
            />
            <Form.Text className="text-muted">
              We will never share your information with anyone
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicBirthday">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="1985-09-29"
              value={this.state.birthdayField}
              onChange={e => this.setBirthdayField(e.target.value)}
            />
          </Form.Group>

          <Button variant="light" onClick={() => this.handleUpdate()}>Update Profile</Button>


        </Form>

      </Col >
    )
  }
}


let mapStateToProps = state => {
  return { movies: state.movies, user: state.user, favorites: state.favorites }
};

export default connect(mapStateToProps, { setUser, setFavorites })(ProfileView);
