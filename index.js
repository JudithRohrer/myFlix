const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan'),
  app = express(),
  cors = require('cors');

//Server-Side validation
const { check, validationResult } = require('express-validator');

// Middleware
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

//give certain origins access
let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', '*'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn't found on the list of allowed allowedOrigins
      let message = 'The CORS policy for this application does not allow access from origin' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));


// Integrating authentication
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


// Integrating mongoose with a REST API
const mongoose = require('mongoose');
const Models =require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true});




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

// Get a user by username
app.get(
  '/users/:username',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Users.findOne({ username: req.params.username }).populate({
      path: 'favorites',
      model: 'Movie'
    })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//POST a new user to the registry
app.post('/users', [
  check('username', 'Username is too short').isLength({ min: 5 }),
  check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('password', 'Password is required').not().isEmpty(),
  check('email', 'Email does not appear to be valid').isEmail()],
  (req, res) => {

  //check validation object for errors
  let errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }

  let hashedPassword = Users.hashPassword(req.body.password);
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + 'already exists');
      } else {
        Users
          .create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            birthday: req.body.birthday
          })
          .then((user) => { res.status(201).json(user) })
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
app.put('/users/:username', [
  check('username', 'Username cannot have fewer than 5 characters.').isLength({ min: 5 }),
  check('username', 'Username may not contain non alphanumeric characters.').isAlphanumeric(),
  check('password', 'Password is required.').not().isEmpty(),
  check('email', 'Email must be valid email address.').isEmail(),
  ],
  passport.authenticate('jwt', { session: false }), (req, res) => {

  //check validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.password);

  Users.findOneAndUpdate({ username: req.params.username}, { $set:
    {
      username: req.body.username,
      password: hashedPassword,
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
app.post('/users/:username/favorites/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
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

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});
