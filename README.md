# myFlix

This project is designed to create a database and API system. 
The process taken creates a database of movies and users and allows 
any user to add themselves to the list of users, and then edit a 
list of favorite movies to be under their user ID. This is done with 
mainly through the use of node.js, express, and mongoose. 

The REST API for "myFlix" is hosted online on Heroku and provides logged 
in users with access to information about different movies, directors, and genres.


To see more of my work visit my portfolio page: *link here*


## Features

- Allows users to see a list of all movies in the database
- Allows users to get detailed information about a single movie by movie title
- Allows users to get detailed information about a genre by genre name
- Allows users to get detailed information about a director by name
- Allows new users to create an user account
- Allows existing users to update their user info or to delete their account
- Allows existing users to add or remove movies to/from their list of favorites

To get holistic information about each endpoint and data that is requestet and responded see *documetation.hmtl*.

## Dependencies

- bcrypt
- body-parser
- cors
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan
- passport
- passport-jwt
- passport-local
- uuid
