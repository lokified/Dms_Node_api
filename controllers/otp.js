import  { generateRandomSixDigitsNumber }  from './randon-number.js';
import  twilioClient  from '../client/client.js';
import pool from "../connection.js"

export const sendCode =  (req, res) => {
    const { phoneNumber } = req.body;

    const randomNumber = generateRandomSixDigitsNumber();

    const message = `Hello from DMS! Your verification code is: ${randomNumber}`;

    try {

        twilioClient.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
            body: message,
        });

        pool.query('SELECT id FROM users WHERE phoneNumber = $1', [phoneNumber], (err, results) => {

            if(!err) {

                const userData = results.rows;

                if(userData.length <= 0) {
                    return res.json({ message: "no user in the database" })

                } else {

                    const userId = parseInt(userData[0].id)

                    pool.query('UPDATE users set otp = $1 WHERE id = $2', [randomNumber.toString(), userId]);

                    return res.json({ message: "Message sent" });

                }

            }
            else{
                return res.json({ error: err });

            }
        });

    }
    catch(e) {
        return res.json({ error: `${e}` });

    }

}



export const verifyCode = (req, res) => {

    const { phoneNumber, smsCode } = req.body
  
    try {

        pool.query('SELECT otp, verified, id FROM users WHERE phoneNumber = $1', [phoneNumber], (err, results) => {

            if(!err) {

                const userData = results.rows;

                if(userData.length <= 0) {
                    return res.json({ message: "no user in the database" })

                } else {

                    const code = userData[0].otp;
                    const userId = parseInt(userData[0].id);
                    const verified = userData[0].verified;

                    if(!verified){

                        if(code === smsCode) {

                            pool.query('UPDATE users set verified = $1 WHERE id = $2', [true, userId]);
    
                            return res.json({ message: "verification successful" });
    
                        }
                        else {
    
                            return res.json({ message: "verification not successful, check your details again" });
                            
                        }
                    }
                    else {

                        return res.json({ message: "you are already verified" });
                    }
                    
                }

            }
            else{
                return res.json({ error: err });

            }
        });

    }
    catch(e) {
        return res.json({ error: `${e}` });

    }
  
}