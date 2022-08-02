import express from "express";
import { getSecurityQuestions, postSecurityQuestions, postSecurityAnswers } from "../controllers/questions.js";

const questionsRouter = express.Router();

questionsRouter.get("/securityQuestions", getSecurityQuestions);
questionsRouter.post("/securityQuestion", postSecurityQuestions);
questionsRouter.post("/securityAnswer", postSecurityAnswers);

export default questionsRouter;