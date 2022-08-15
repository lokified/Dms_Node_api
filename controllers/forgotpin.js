import pool from "../connection.js";
import  { generateRandomSixDigitsNumber }  from './randon-number.js';
import  twilioClient  from '../client/client.js';

export const verifyWithId = (req,res) => {

    const { phoneNumber, idNumber } = req.body;

    const query = 'SELECT idnumber FROM users WHERE phoneNumber = $1';

    pool.query( query, [phoneNumber], (err, results) => {

        if(!err) {

            const userData = results.rows;

            console.log(userData[0].idNumber)

            if(userData.length > 0 && userData[0].idnumber === idNumber) {

                sendOTP(phoneNumber);
                res.json({ message: "You id number exists"});
            }
            else {

                res.json({ message: "The id number provided does not exist"});
            }
        }
        else {

            res.json({message: `${err}`});
        }
    });
}


export const verifyWithSecurityQuestion = (req, res) => {

    const { phoneNumber, answer1 } = req.body;

    pool.query( 'SELECT id FROM users WHERE phoneNumber = $1', [phoneNumber], (err, resul) => {

        if(!err) {

            const user_id = resul.rows[0].id;


            pool.query('SELECT answer_1 FROM security_answers WHERE user_id = $1', [user_id], (error, resu) => {

                const answerData = resu.rows;

                if(!error) {

                    if(answerData.length > 0 && answerData[0].answer_1 === answer1) {

                        sendOTP(phoneNumber);
                        res.json({message: "You answer matches"});
                    }
                    else {

                        res.json({message:"your answer is incorrect"});
                    }
                }
                else {

                    res.json({message:`${error}`});
                }
            });
        }
        else {

            res.json({message:`${err}`})
        }
    })
}



const sendOTP = (phoneNumber) => {
    
    const randomNumber = generateRandomSixDigitsNumber();

    const message = `Hello from DMS! Your verification code is: ${randomNumber}`;

    twilioClient.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
        body: message,
    });

    pool.query('UPDATE users SET otp = $1, verified = $2 WHERE phoneNumber = $3', [randomNumber, false, phoneNumber]);
}