import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser, setFavorites } from '../../actions/actions';

import axios from 'axios';

import './login-view.scss';

/**
 * @requires React
 * @requires react-bootstrap/Button
 * @requires prop-types
 * @requires react-bootstrap/Form
 * @requires react-bootstrap/Col
 * @requires react-bootstrap/Row
 * @requires react-bootstrap/Container
 * @requires axios
 * @requires react-bootstrap/Card
 * @requires './login-view.scss'
 */

/**
* Login view
* @function LoginView
* @param {object} props - user props
* @returns {LoginView}
*/

function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix-123-db.herokuapp.com/login', {
      username: username,
      password: password
    })
      .then(response => {
        const data = response.data;

        let userToStore = {
          username: data.user.username,
          email: data.user.email,
          birthday: data.user.birthday
        }

        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user.username);
        localStorage.setItem('email', JSON.stringify(data.user.email));
        localStorage.setItem('birthday', JSON.stringify(data.user.birthday.substring(0, 10)));
        props.setUser(userToStore);
        props.setFavorites(data.user.favorites);
        localStorage.setItem('favorites', JSON.stringify(data.user.favorites));
        props.getMovies(data.token);
      })
      .catch(e => {
        console.log('no such user')
      });
  }





  return (
    <Container style={{ maxWidth: "50rem", margin: "0 auto" }}>

      <Row className="bg-light p-5">
        <Col>
          <h2>Log in</h2><br />
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className="button-main"
              variant="dark"
              type="submit"
              onClick={handleSubmit}
            >Sign In
        </Button>

            <Link to={`/register`}>
              <Button variant="link">Or register now!</Button>
            </Link>

          </Form>
        </Col>
      </Row>
    </Container>

  );
}

let mapStateToProps = state => {
  return {}
}

let mapDispatchToProps = {
  setUser: setUser,
  setFavorites: setFavorites
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);


LoginView.propTypes = {
  getMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}
