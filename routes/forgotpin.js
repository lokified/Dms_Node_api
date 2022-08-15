import express from "express";

import {
   verifyWithId,
   verifyWithSecurityQuestion
} from "../controllers/forgotpin.js";

const forgotPinRoutes = express.Router();

forgotPinRoutes.post("/verifyWithId", verifyWithId);
forgotPinRoutes.post("/verifyWithSecurityQuestion", verifyWithSecurityQuestion);

export default forgotPinRoutes;