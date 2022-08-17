import express from "express";
import { checkAccountBalance, depositToWallet } from "../controllers/wallet.js";

const walletRoutes = express.Router();

walletRoutes.get("/checkAccountBalance/:phoneNumber", checkAccountBalance);
walletRoutes.post("/depositToWallet", depositToWallet);

export default walletRoutes;