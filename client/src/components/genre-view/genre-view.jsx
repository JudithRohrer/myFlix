import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card, { CardTitle } from 'react-bootstrap/Card';



import './genre-view.scss';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="genre-view">
        <Card className="cardBody" style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>{genre.name}</Card.Title>
            <Card.Text>{genre.description}</Card.Text>

            <Link to={`/`}>
              <Button variant="light">Close</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );


  }
}

GenreView.propTypes = {
  gerne: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};
