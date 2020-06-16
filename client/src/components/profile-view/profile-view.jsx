import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";






export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: []
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
          birthday: response.data.birthday,
          favorites: response.data.favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { username, email, birthday, favorites } = this.state;


    return (
      <div>
        <h1>My Profile:</h1>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Birthday: {birthday}</p>
        <p>My Favorite Movies: {favorites}</p>

      </div>
    )
  }
}

