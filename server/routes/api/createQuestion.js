
const Question = require('../../models/Question');

module.exports = (app) => {
  //sign up
  app.post('/api/add/question', (req, res) => {
    const {body} = req;
    const {
      title,
      task,
      type,
      answer
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
    // if (!answer) {
    //   return res.send({
    //     success: false,
    //     message: 'Error: Role cannot be blank.'
    //   });
    // }

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
          message: 'Error: Question already exists.'
        });
      }

      const newQuestion = new Question();

      newQuestion.title = title;
      newQuestion.task = task;
      newQuestion.type = type;
      // newQuestion.answer = answer;

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

}


