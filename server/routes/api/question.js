
const Question = require('../../models/Question');

module.exports = (app) => {
  //sign up
  app.post('/api/add/question', (req, res) => {
    const {body} = req;
    const {
      title,
      task,
      type,
      answers,
      correctAnswers
    } = body;

    if (!title) {
      return res.send({
        success: false,
        message: 'Error: Title cannot be blank.'
      });
    }
    if (!task) {
      return res.send({
        success: false,
        message: 'Error: Task cannot be blank.'
      });
    }
    if (!type) {
      return res.send({
        success: false,
        message: 'Error: Type cannot be blank.'
      });
    }
    if (!answers) {
      return res.send({
        success: false,
        message: 'Error: Role cannot be blank.'
      });
    }

    Question.find({
      title: title
    }, (err, previousQuestions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      } else if (previousQuestions.length > 0) {
        return res.send({
          success: false,
          message: 'Error: CreateQuestion already exists.'
        });
      }

      const newQuestion = new Question();

      newQuestion.title = title;
      newQuestion.task = task;
      newQuestion.type = type;
      newQuestion.answers = answers;
      newQuestion.correctAnswers = correctAnswers;

      newQuestion.save((err, question) => {
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

  app.get('/api/questions', (req, res)  => {
    Question.find(function(err, questions) {
      if (err) {
        console.log(err);
      } else {
        res.json(questions);
      }
    });
  });


  app.delete('/api/questions/:id', (req, res)  => {
    let questionId = {_id:req.params.id};

    Question.deleteOne(questionId, function (err) {
      if(err){
        res.status(500).send('Test not found.');
      }
      res.send('Success');
    })

  });
};


