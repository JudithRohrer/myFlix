import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const onRegLinkClick = (e) => {
    return <RegistrationView />
  }


  return (
    <Container className="loginContainer">
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

        <Button
          className="register-button"
          variant="link"
          type="submit"
          onClick={onRegLinkClick}
        >Or register now!
        </Button>

      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  handleSubmit: PropTypes.shape({
    onLoggedIn: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
};
