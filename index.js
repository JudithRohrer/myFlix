const express = require('express'),
morgan = require('morgan');

const app = express();

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

// GET requests
app.get('/movies', (req, res) => {
  res.json(topFilms);
});

app.get('/', (req, res) => {
  res.send('Welcome to myFlix - The incredible movie app!');
});

app.use(express.static('public'));

app.use((err, req, res, next) =>{
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080);
