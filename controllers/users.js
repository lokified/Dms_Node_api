import pool from "../connection.js"

export const getUsers = (req, res) => {

    pool.query('SELECT * FROM users ORDER by id ASC', (err, results) => {

        if(err) {
            throw err;
        }
        else {
            res.status(200).json(results.rows)
        }
    })

}

export const createUser = (req, res) => {

    const { 
        firstName, 
        lastName, 
        idNumber, 
        phoneNumber, 
        email
    } = req.body;

    pool.query('INSERT INTO users (firstName, lastName, idNumber, phoneNumber, email) VALUES($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, idNumber, phoneNumber, email], (err, results) => {

        if(err) {
            throw err;
        }

        res.status(201).send(`user added with id: ${results.rows[0].id}`)
    })
}


export const updateUserDetails = (req, res) => {

    const id = parseInt(req.params.id);
    const { 
        firstName, 
        lastName, 
        idNumber, 
        phoneNumber, 
        email
    } = req.body;

    pool.query('UPDATE users SET firstName = $1, lastName = $2, idNumber = $3, phoneNumber = $4, email = $5 WHERE id = $6',
    [firstName, lastName, idNumber, phoneNumber, email, id], (err, results) => {

        if(err) throw err;

        res.status(200).send(`user with id: ${id} is updated`)

    });
}