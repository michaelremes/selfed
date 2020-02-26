const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  //sign up
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      role,
      password
    } = body;
    let {
      username
    } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: 'Error: First name cannot be blank.'
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: 'Error: Last name cannot be blank.'
      });
    }
    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank.'
      });
    }
    if (!role) {
      return res.send({
        success: false,
        message: 'Error: Role cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    //steps:
    //1. verifiy username
    //2. save
    User.find({
      username: username
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: User already exists.'
        });
      }

      const newUser = new User();

      newUser.username = username;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.role = role;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          });
        }
        return res.send({
          success: true,
        });
      })

    })
  });



  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        // DO ACTION
        return res.send({
          success: true,
          message: 'Verified'
        });
      }
    });
  });

};
