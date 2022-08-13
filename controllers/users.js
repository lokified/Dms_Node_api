import pool from "../connection.js"
import jwt from "jsonwebtoken";

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


    pool.query('SELECT * FROM users WHERE phoneNumber = $1', [phoneNumber], (error, results) => {

        if(!error){

            if(results.rows.length <= 0) {

                pool.query('INSERT INTO users (firstName, lastName, idNumber, phoneNumber, email, pin, otp, verified) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [firstName, lastName, idNumber, phoneNumber, email, "0000", "0000", false], (err, results) => {

                    if(!err) {

                        res.status(201).json({ id : results.rows[0].id, message : "user added" });
                    }
                    else {
                        res.status(500).json(err)
                    }

                });
            }
            else{
                
                res.status(400).json({message: "user already exists."});

            }
        }
        else {
            res.status(500).json(error)
        }
    });
            


}



export const updateUserDetails = (req, res) => {

    const phoneNumber = req.params.phoneNumber;
    const { pin } = req.body;

    pool.query('UPDATE users SET  pin = $1 WHERE phoneNumber = $2',
    [pin, phoneNumber], (err, results) => {

        if(err) throw err;

        res.status(200).json({ "message" : `user's pin is updated` })

    });
}


export const loginUser = (req, res) => {

    const { phoneNumber, pin } = req.body;

    const query = 'SELECT firstName, lastName, phoneNumber, pin FROM users WHERE phoneNumber = $1';

    pool.query(query, [phoneNumber], (err, results) => {

        if(!err) {

            const userData = results.rows;

            if(userData.length <= 0 || userData[0].pin != pin) {

                res.status(401).json({message: "invalid pin or phone number"});
            }
            else {

                const response = {
                    firstName : userData[0].firstname,
                    lastName: userData[0].lastname,
                    phoneNumber: userData[0].phonenumber
                }

                const accessToken = jwt.sign(
                    response, 
                    process.env.TOKEN_KEY, 
                    { expiresIn: '5h'}
                    );

                res.status(200).json({token: accessToken});
            }
            
        } else {

            res.status(500).json({message: err});
        }
    })
}

export const accountLookUp = (req, res) => {

    const { phoneNumber } = req.params;

    pool.query('SELECT firstName, phoneNumber FROM users WHERE phoneNumber = $1', [phoneNumber], (error, results) => {

        if(!error) {

            if(results.rows.length > 0) {
                res.json({ 
                    message : "you are already registered",
                    firstName : `${results.rows[0].firstname}`,
                    lastName: `${results.rows[0].lastname}` 
                });
            }
            else{
                res.json({ message : "you are not registered"});
            }
        }
        else{
            res.json({ message : error });
        }
    });
}