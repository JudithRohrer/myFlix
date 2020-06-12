import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



import './genre-view.scss';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    return (
      <div className="genre-view">
        <Card className="cardBody" style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>{genre.name}</Card.Title>
            <Card.Text>Description: {gerne.description}</Card.Text>

            <Link to={`/`}>
              <Button variant="light">Close</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  gerne: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};
