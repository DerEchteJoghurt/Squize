class QuizDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }    
    
    getConnection() {
        return this._conn;
    }

    getQuizById(id) {
        var sql = 'SELECT * FROM Quizze WHERE quiz_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get([id]);
        
        return result;
    }

    getQuizByUsername(username) {
        var user = "SELECT user_id FROM User WHERE username=?"
        var sql = 'SELECT * FROM Quizze WHERE user_id=?';
        var user_id = this._conn.prepare(user);
        var user_id_res = user_id.get(username);

        var statement = this._conn.prepare(sql);
        var result = statement.all(user_id_res);

        return result;
    }

    getQuizByName(quizname) {
        var sql = 'SELECT * FROM Quizze WHERE quizname=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(quizname);
        
        return result;
    }

    getQuizByUserId(userid) {
        var sql = 'SELECT * FROM Quizze WHERE user_id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.all(userid);
        
        return result;
    }

    getQuizByQuery(query) {
        var sql = 'SELECT * FROM Quizze WHERE quizname LIKE \'%\' || ? || \'%\'';
        var statement = this._conn.prepare(sql);
        var result = statement.all(query);
        
        return result;
    }

    getQuestionById(questionId) {

    }

    getQuestionByPosition(quizId, pos) {

    }

    addQuestion(quizObject) {
        console.dir(quizObject);
        var quiz_sql = 'INSERT INTO Questions (quiz_id, position, question, question_type) VALUES (?,?,?,?)';
        var ans_sql = 'INSERT INTO Answers (question_id, answer_text, is_correct) VALUES (?,?,?)';
        var quiz_statement = this._conn.prepare(quiz_sql);
        var quiz_info = quiz_statement.run([quizObject.quiz_id, quizObject.question.pos, quizObject.question.question, quizObject.question.qtype]);
        var ans_statement = this._conn.prepare(ans_sql);
        var ans_info = [];
        for (const key in quizObject.question.answer) {
            i = 0;
            if (Object.hasOwnProperty.call(quizObject.question.answer, key)) {
                const element = quizObject.question.answer[key];
                var correct = key == "correct" ? 1 : 0;
                ans_info[i] = ans_statement.run([quiz_info.lastInsertRowid, element, correct])
                console.dir(ans_info)
            }
            i++;
        }
        if (ans_info.every((value) => { return value == 1})) {
            return {changes : quiz_info.changes, quiz_id : quiz_info.lastInsertRowid, ans_info : ans_info};
        }
        return {changes : quiz_info.changes, quiz_id : quiz_info.lastInsertRowid, ans_info : ans_info, errormsg : "Something went wrong!"};
    }

    updateQuestion(quizObject) {

    }

    deleteQuestion(quizObject) {
    }


    getPopularQuizzes(amount) {
        var sql = 'SELECT * FROM Quizze ORDER BY aufrufe DESC LIMIT ?';
        var statement = this._conn.prepare(sql);
        var results = statement.all(amount);
        
        return results;

    }

    createQuiz(quizobject, user) {
        var quiz = quizobject;
        var sql = 'INSERT INTO Quizze (user_id, quizname, last_edited, beschreibung, is_public, aufrufe) VALUES (?, ?, ?, ?, ?, ?)';
        var statement = this._conn.prepare(sql);
        var info = statement.run([user, quiz.quizname.toString(), quiz.lastedit, quiz.beschreibung, quiz.is_public, 0]);

        return {changes : info.changes, quiz_id : info.lastInsertRowid};
    }

    updateQuiz(quizobject) {
        var sql = 'UPDATE Quizze SET quizname=?, last_edited=?, beschreibung=?, is_public=? WHERE quiz_id=?';
        var statement = this._conn.prepare(sql);
        var info = statement.run([quizobject.quizname.toString(), quizobject.lastedit, quizobject.beschreibung, quizobject.is_public, quizobject.quiz_id]);

        return {changes : info.changes, quiz : quizobject};
    }

    deleteQuiz(quizname = "", quiz_id = 0) {
        if (quizname = "" && quiz_id == 0) {
            return {errormsg : "Du musst einen quizname oder eine quiz_id angeben"};
        }
        if(!(this.getQuizById(quiz_id) === undefined)) {
            var sql = 'DELETE FROM Quizze WHERE quiz_id=?';
            var statement = this._conn.prepare(sql);
            var info = statement.run(quiz_id);
            return {changes : info.changes};
        }
        if(!(this.getQuizByName(quizname) === undefined)) {
            var sql = 'DELETE FROM Quizze WHERE quizname=?'
            var statement = this._conn.prepare(sql);
            var info = statement.run(quizname);
            return {changes : info.changes};
        }
        return {errormsg : "Quiz konnte nicht gefunden werden, versuche es mit einem anderen identifier"};
    }

}

module.exports = QuizDao;