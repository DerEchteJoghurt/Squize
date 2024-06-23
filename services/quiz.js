const express = require('express');
const QuizDao = require('../dao/quizDao.js')
var serviceRouter = express.Router();

serviceRouter.post('/quiz/create_quiz', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.createQuiz(request.body);
    response.status(400).json(res)
});

serviceRouter.post('/quiz/update_quiz', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.updateQuiz(request.body);
    response.status(400).json(res)
});

serviceRouter.post('/quiz/add_question', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.addQuestion(request.body);
    response.status(400).json(res)
});

serviceRouter.post('/quiz/update_question', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.updateQuestion(request.body);
    response.status(400).json(res)
});

serviceRouter.post('/quiz/delete_question', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.deleteQuestionQuestion(request.body);
    response.status(400).json(res)
});

module.exports = serviceRouter;
