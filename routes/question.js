import express from "express";
import { 
    getSecurityQuestions, 
    postSecurityQuestions, 
    postSecurityAnswers,

} from "../controllers/questions.js";

import { sendCode, verifyCode } from "../controllers/otp.js";

const questionsRouter = express.Router();

questionsRouter.get("/securityQuestions", getSecurityQuestions);
questionsRouter.post("/securityQuestion", postSecurityQuestions);
questionsRouter.post("/securityAnswer", postSecurityAnswers);
questionsRouter.post("/sendOTP", sendCode);
questionsRouter.post("/verifyCode", verifyCode);

export default questionsRouter;