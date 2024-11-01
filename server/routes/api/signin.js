const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.post('/api/account/login', (req, res, next) => {
    const {body} = req;
    const {
      password
    } = body;
    let {
      username
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }


    User.find({
      username: username
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
        });
      }
      if (users.length !== 1) {
        return res.send({
          success: false,
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
        });
      }
      //correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Invalid.'
          });
        }
        return res.send({
          success: true,
          message: 'Valid login',
          token: doc._id,
          user_id: user._id,
          user_role: user.role,

        });

      });
    });
  });


  app.get('/api/account/logout', (req, res) => {
    // Get the token
    const {query} = req;
    const {token} = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Successful'
      });
    });
  });
};
