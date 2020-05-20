const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan'),
  app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

// Integrating authentication
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


// Integrating mongoose with a REST API
const mongoose = require('mongoose');
const Models =require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true});




//URLs

app.get('/', (req, res) => {
  res.send('Welcome to myFlix - The incredible movie app!');
});

// GET the list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//GET data about a certain movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



//GET data about a certain genre by name
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'genre.name': req.params.name })
    .then((movies) => {
      res.status(201).json(movies.genre);
    })
    .catch((error) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET data about a certain director by name
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'director.name': req.params.name })
  .then((movies) =>{
    res.status(201).json(movies.director);
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//POST a new user to the registry
app.post('/users', (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + 'already exists');
      } else {
        Users
          .create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
          })
          .then((user) => {res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + err);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error' + err);
    });
});

//Update users information by username
app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username}, { $set:
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday
    }
  },
  {new: true}, // This line makes sure that the updates document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//POST a new movie to users favorite-listening
app.post('/users/:username/favorites/:MovieID', passport.authenticate('jwt', {session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
    $push: { favorites: req.params.MovieID }
  },
  {new: true}, //This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  })
});

//DELETE a movie from users favorite-list
app.delete('/users/:username/favorites/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username },
    { $pull: { favorites: req.params.MovieID }},
    { new: true },
    (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
    })
});

//DELETE a user from registry
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});




// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Port to listen
app.listen(8080, () => {
  console.log('Server is running now.');
});
