import pool from "../connection.js";

export const depositToWallet = (req, res) => {

    const { phoneNumber, amount } = req.body;

    const query = 'SELECT id, firstName, lastName FROM users WHERE phoneNumber = $1';

    pool.query( query, [phoneNumber], (err, result) => {

        const user_id = result.rows[0].id;
        const firstName = result.rows[0].firstname;
        const lastName = result.rows[0].lastname;

        if(!err) {

            //if response from mpesa is success update table else cancel update

            pool.query( 'UPDATE wallet SET amount = $1 WHERE user_id = $2', [amount, user_id], (error, results) => {

                if(!error) {

                    //send notification
                    res.status(201).json({message: `Your deposit of KSH ${amount} was successful your available wallet balance is `})

                    //add transaction
                    addToTransactions(
                        `${firstName} ${lastName}`,
                        phoneNumber,
                        amount,
                        "DEPOSIT",
                        user_id
                    )
                
                }
                else {
                    res.json({ message: `${error}`});
                }
            });
        
        }
        else {
            res.json({ message: `${err}`});
        }
    });
}


export const checkAccountBalance = (req, res) => {

    const { phoneNumber } = req.params;

    const query = 'SELECT id FROM users WHERE phoneNumber = $1';

    pool.query( query, [phoneNumber], (err, result) => {

        const user_id = result.rows[0].id;

        if(!err) {

            pool.query('SELECT amount FROM wallet WHERE user_id = $1', [user_id], (error, results) => {

                if(!error) {

                    res.json({ message : `${results.rows[0].amount}` });
                }
                else {
                    res.json({ message: `${error}`});
                }
            });
        } 
        else {
            res.json({ message: `${err}`});
        }
    });
}


const addToTransactions = (name, phoneNumber, amount, transactionType, user_id) => {

    const query = 'INSERT INTO transactions (name, phoneNumber, amount,transactionType, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *'

    pool.query( query, [name, phoneNumber, amount, transactionType, user_id] );
}