const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

const app = express();

app.use(bodyParser.json());

let topFilms = [
  {
    title: 'Lock, Stock and Two Smoking Barrels',
    director: 'Guy Ritchie'
  },
  {
    title: 'The Big Lebowski',
    director: 'Joel Coen'
  },
  {
    title: 'Smokin\' Aces',
    director: 'Joe Carnahan'
  },
  {
    title: 'Rock N Rolla',
    director: 'Guy Ritchie'
  },
  {
    title: 'Joker',
    director: 'Todd Phillips'
  },
  {
    title: 'Was nicht passt, wird passend gemacht',
    director: 'Peter Thorwarth'
  },
  {
    title: 'Bang Boom Bang',
    director: 'Peter Thorwarth'
  },
  {
    title: 'Victoria',
    director: 'Sebastian Schipper'
  },
  {
    title: 'The Art of Flight',
    director: 'Curt Morgan'
  },
  {
    title: 'Wholetrain',
    director: 'Florian Gaag'
  }
];

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to myFlix - The incredible movie app!');
});

// GET the list of all movies
app.get('/movies', (req, res) => {
  res.json(topFilms);
});

//GET data about a certain movie by title
app.get('/movies/:title', (req, res) =>{
  res.send('Sucessful GET request returning data of a single movie by title');
});

//GET data about a certain genre
app.get('/movies/genre/:name', (req, res) => {
  res.send('Sucessful GET request returning data of a certain genre');
});

//GET data about a certain director
app.get('/movies/director/:name', (req, res) => {
  res.send('Sucessful GET request returning data of a certain director');
});

//POST a new user to the registry
app.post('/users', (req, res) => {
  res.send('Sucessful POST request to add a new user to registry');
});

//Update users information
app.put('/users/:username/profile', (req, res) => {
  res.send('Sucessful PUT request to update user information');
});

//POST a new movie to users favorite-listening
app.post('/users/:username/favorites', (req, res) => {
  res.send('Sucessful POST request to add a movie to users favorite-list');
});

//DELETE a movie from users favorite-listen
app.delete('/users/:username/favorites/:title', (req, res) => {
  res.send('Sucessful DELETE request to remove a movie from users favorite-list');
});

//DELETE a user from registry
app.delete('/users/:username', (req, res) => {
  res.send('Sucessful DELETE request to remove a user from registry');
});




app.use(express.static('public'));

app.use((err, req, res, next) =>{
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Server is running now.');
});
