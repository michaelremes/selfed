
const Test = require('../../models/Test');
const UserResult = require('../../models/UserResults');

module.exports = (app) => {
  app.post('/api/add/test', (req, res)  => {
    const {body} = req;
    const {
      title,
      questions,
    } = body;

    const newTest = new Test();

    newTest.title = title;
    newTest.questions = questions;

    newTest.save((err, question) => {
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

  });




  app.get('/api/tests', (req, res)  => {
    Test.find(function(err, tests) {
      if (err) {
        console.log(err);
      } else {
        res.json(tests);
      }
    });
  });

  app.delete('/api/test/:id', (req, res)  => {
    const testId =  {_id:req.params.id};

      Test.deleteOne(testId, function (err) {
        if(err){
          res.status(500).send('Test not found.');
        }
        res.send('Success');
      })

  });

  //add user result
  app.post('/api/add/student/test', (req, res)  => {
    const {body} = req;
    const {
      username,
      finishedTest,
      totalPoints
    } = body;

    const newUserResult = new UserResult();

    newUserResult.username = username;
    newUserResult.finishedTest = finishedTest;
    newUserResult.totalPoints = totalPoints;

    newUserResult.save((err) => {
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

  });

  app.get('/api/student/tests', (req, res)  => {
    UserResult.find(function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.json(results);
      }
    });
  });



};


