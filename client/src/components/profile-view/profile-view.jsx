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
          birthday: response.data.birthday ? response.data.birthday.substr(0, 10) : " ",
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
        <Card className="Profile-Card" style={{ width: '28rem' }}>
          <Card.Body>
            <Card.Title>{username}</Card.Title>
            <Card.Text>Password: ######</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
            <Card.Text>Birthday: {birthday}</Card.Text>
            <Card.Text>My favorite movies: {favorites}</Card.Text>
          </Card.Body>
        </Card>






      </div >
    )
  }
}

