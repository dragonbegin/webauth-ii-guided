const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // this shouldn't happen
  //grabbing a cookie
  const { username, password } = req.headers;
  //make sure cookie is valid
  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        //we never need to check the password
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ran into an unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
