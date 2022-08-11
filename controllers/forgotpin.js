import pool from "../connection.js";
import  { generateRandomSixDigitsNumber }  from './randon-number.js';
import  twilioClient  from '../client/client.js';

export const verifyWithId = (req,res) => {

    const { phoneNumber, idNumber } = req.body;

    const query = 'SELECT idNumber FROM users WHERE phoneNumber = $1';

    pool.query( query, [phoneNumber], (err, results) => {

        if(!err) {

            const userData = results.rows;

            if(userData.length > 0 || userData[0].idNumber === idNumber) {

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

    const { phoneNumber, answer_1 } = req.body;

    const query = 'SELECT id FROM users WHERE phoneNumber = $1';

    pool.query( query, [phoneNumber], (err, results) => {

        if(!err) {

            const user_id = results.rows[0].id;


            pool.query('SELECT answer_1 FROM security_answers WHERE user_id = $1', [user_id], (error, result) => {

                const answerData = result.rows;

                if(!error) {

                    if(answerData.length > 0 && answerData[0].answer_1 === answer_1) {

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

export const verifyChangePinOtp = (req,res) => {

    const { phoneNumber, smsCode } = req.body;

    pool.query('SELECT otp FROM users WHERE phoneNumber = $1', [phoneNumber], (err, results) => {

        if(!err) {

            const userData = results.rows;

            if(userData.length <= 0) {
                return res.json({ message: "no user in the database" })

            } else {

                const code = userData[0].otp;

                if(code === smsCode) {

                    res.json({ message: "verification successful" });

                }
                else {

                    res.json({ message: "verification not successful, check your details again" });
                    
                }
                
            }

        }
        else {

            res.json({ message: `${err}` });
        }

    });
}


const sendOTP = (phoneNumber) => {
    
    const randomNumber = generateRandomSixDigitsNumber();

    const message = `Hello from DMS! Your verification code is: ${randomNumber}`;

    twilioClient.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
        body: message,
    });
}