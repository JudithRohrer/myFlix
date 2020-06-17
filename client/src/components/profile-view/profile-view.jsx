import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";






export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
      usernameField: '',
      passwordField: '',
      emailField: '',
      birthdayField: ''
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getUsers(accessToken);
    }
  }



  getUsers(token) {
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
  }


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



  deleteFavMovie(movieId) {
    axios
      .delete(`https://myflix-123-db.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        this.setState({
          favorites: res.data.favorites
        });
      })
      .catch(function () {
        console.log("Cannot delete movie from list");
      });
    this.setState;
  }





  render() {

    const { username, email, birthday, favorites } = this.state;



    return (
      <div>
        <Card className="Profile-Card" style={{ width: '34rem' }}>
          <Card.Body>
            <Card.Title>{username}</Card.Title>
            <Card.Text>Password: ######</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
            <Card.Text>Birthday: {birthday}</Card.Text>

          </Card.Body>
          <Card.Footer>

            <h4>{username}'s favorite movies: </h4>

            <div className="d-flex">
              {favorites == 0 && <h2> No favorites yet!</h2>}
              {favorites &&
                favorites.map(movie => {
                  return (
                    <div key={movie._id}>
                      <Card className="profile-view-card box-shadow" style={{ width: "10rem" }}>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img variant="top" src={movie.imagePath} />
                        </Link>
                        <Button variant="outline-danger" size="sm" onClick={() => this.deleteFavMovie(movie._id)}>Remove from list</Button>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </Card.Footer>
        </Card>

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
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="1985-09-29"
              value={this.state.birthdayField}
              onChange={e => this.setBirthdayField(e.target.value)}
            />
          </Form.Group>

          <Button variant="info">Update Profile</Button>


        </Form>




      </div>
    )
  }
}

