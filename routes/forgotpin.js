import express from "express";

import {
   verifyWithId,
   verifyWithSecurityQuestion,
   verifyChangePinOtp
} from "../controllers/forgotpin.js";

const routes = express.Router();

routes.post("/verifyWithId", verifyWithId);
routes.post("/verifyWithSecurityQuestion", verifyWithSecurityQuestion);
routes.post("/verifyChangePinOtp", verifyChangePinOtp);

export default routes;