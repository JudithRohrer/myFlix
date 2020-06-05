import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


// import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, CreatePassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleRegistration = e => {
    e.preventDefault();
    console.log(username, password, email, birthday);

    props.onLoggedIn(username, password, email, birthday);
  };

  return (
    <Container className="registrationContainer">
      <Form className="registrationForm">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => createUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            value={password}
            onChange={e => createPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => createEmail(e.target.value)}
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
            value={birthday}
            onChange={e => createBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" type="submit" onClick={handleRegistration}>Register me!</Button>
      </Form>
    </Container>
  );
}

RegistrationView.propTypes = {
  handleRegistration: PropTypes.shape({
    onRegistration: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
};
