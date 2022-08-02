import pool from "../connection.js"

export const postSecurityQuestions = (req, res) => {

    const { 
        question_1,
        question_2,
        question_3
    } = req.body;

    pool.query('INSERT INTO security_questions (question_1, question_2, question_3) VALUES($1, $2, $3) RETURNING *', [question_1, question_2, question_3], (err, results) => {

        if(err) {
            throw err;
        }

        res.status(201).json({ "message" : `security question added with id: ${results.rows[0].id}` });
    })
}

export const getSecurityQuestions = (req, res) => {

    pool.query('SELECT * FROM security_questions', (err, results) => {

        if(err) {
            throw err;
        }
        else {
            res.status(200).json(results.rows);
        }
    })
}

export const postSecurityAnswers = (req, res) => {

    const { user_id } = req.params;

    const { 
        answer_1,
        answer_2,
        answer_3
    } = req.body;

    pool.query('INSERT INTO security_questions (answer_1, answer_2, answer_3, user_id) VALUES($1, $2, $3, $4) RETURNING *', [answer_1, answer_2, answer_3, user_id], (err, results) => {

        if(err) {
            throw err;
        }

        res.status(201).json( { "message" : `security answer added with user id: ${results.rows[0].user_id}` });
    })
}