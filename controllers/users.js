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

    const {name, email} = req.body;

    pool.query('INSERT INTO users (name, email) VALUES($1, $2) RETURNING *', [name, email], (err, results) => {

        if(err) {
            throw err;
        }

        res.status(201).send(`user added with id: ${results.rows[0].id}`)
    })
}

export const getUser = (req, res) => {

    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {

        if(err) {
            throw err;
        }
        res.status(200).json(results.rows)

    })
}

export const deleteUser = (req,res) => {

    const { id } = req.params;

    pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {

        if(err) throw err;

        res.status(200).send(`user with id ${id} is deleted`)
    })

}

export const updateUser = (req, res) => {

    const id = parseInt(req.params.id);
    const {name, email} = req.body;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id], (err, results) => {

        if(err) throw err;

        res.status(200).send(`user with id: ${id}`)

    });
}