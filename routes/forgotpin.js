import express from "express";

import {
   verifyWithId,
   verifyWithSecurityQuestion
} from "../controllers/forgotpin.js";

const routes = express.Router();

routes.post("/verifyWithId", verifyWithId);
routes.post("/verifyWithSecurityQuestion", verifyWithSecurityQuestion);

export default routes;