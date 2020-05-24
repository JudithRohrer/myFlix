const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String,
    birth: String
  },
  imagePath: String,
  featured: Boolean
});

let userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birthday: Date,
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

let Movie = mongoose.model('Movie', movieSchema, 'movies');
let User = mongoose.model('User', userSchema, 'users');

module.exports.Movie = Movie;
module.exports.User = User;
