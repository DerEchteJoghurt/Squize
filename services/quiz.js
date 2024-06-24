const express = require('express');
const QuizDao = require('../dao/quizDao.js')
var serviceRouter = express.Router();


serviceRouter.post('/quiz/create_quiz', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.createQuiz(request.body);
    if (res.hasOwnProperty("errormsg")){
        response.status(400).json(res)
    }
    response.status(200).json(res)
});

serviceRouter.get('/quiz/popular', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);

    let amount = 3;
    if (request.query.amount) {
        amount = request.query.amount;
    }

    let results = quizDao.getPopularQuizzes(amount);
    if (!results) {
        response.status(400).json({ message: 'Failed to load quizzes' });
        return;
    }

    response.status(200).json(results);
});

serviceRouter.get('/quiz/:id', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let result = quizDao.getQuizById(request.params.id);
    if (!result) {
        response.status(400).json({ message: 'Failed to load quiz' });
        return;
    }

    response.status(200).json(result);
});

serviceRouter.post('/profile/create_quiz', function(request, response) {

    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.createQuiz(request.body);
    if (res.hasOwnProperty("errormsg")){
        response.status(400).json(res)
    }
    response.status(200).json(res)
});

serviceRouter.post('/quiz/update_quiz', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.updateQuiz(request.body);
    if (res.hasOwnProperty("errormsg")){
        response.status(400).json(res)
    }
    response.status(200).json(res)
});

serviceRouter.delete('/quiz/delete_quiz', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.deleteQuiz(request.body);
    if (res.hasOwnProperty("errormsg")){
        response.status(400).json(res)
    }
    response.status(200).json(res)
});

serviceRouter.post('/quiz/add_question', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.addQuestion(request.body);
    if (res.hasOwnProperty("errormsg")){
        response.status(400).json(res)
    }
    response.status(200).json(res)
});

serviceRouter.post('/quiz/update_question', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.updateQuestion(request.body);
    if (res.hasOwnProperty("errormsg")){
        response.status(400).json(res)
    }
    response.status(200).json(res)
});

serviceRouter.delete('/quiz/delete_question', function(request, response) {
    let quizDao = new QuizDao(request.app.locals.dbConnection);
    let res = quizDao.deleteQuestionQuestion(request.body);
    if (res.hasOwnProperty("errormsg")){
        response.status(400).json(res)
    }
    response.status(200).json(res)
});

module.exports = serviceRouter;
