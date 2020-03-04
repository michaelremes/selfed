
const Test = require('../../models/Test');

module.exports = (app) => {

  app.get('/api/tests', (req, res)  => {
    Test.find(function(err, tests) {
      if (err) {
        console.log(err);
      } else {
        res.json(tests);
      }
    });
  });

}


