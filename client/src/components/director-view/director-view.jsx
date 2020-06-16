import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



import './director-view.scss';


export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Container>
        <div className="director-view">
          <Card className="cardBody" style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>{director.name}</Card.Title>
              <Card.Text>{director.bio}</Card.Text>
              <Card.Text>Birth Year: {director.birth}</Card.Text>
              <Link to={`/`}>
                <Button variant="light">Close</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired
  })
};
