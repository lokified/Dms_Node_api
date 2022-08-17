import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import userRoutes from "./routes/user.js";
import questionsRoutes from "./routes/question.js";
import forgotPinRoutes from "./routes/forgotpin.js";
import walletRoutes from "./routes/wallet.js";

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {

    if(req.url) {
        
        res.send("hello world")
    }
})

app.use("/api", userRoutes);
app.use("/api", questionsRoutes);
app.use("/api", forgotPinRoutes);
app.use("/api", walletRoutes);

app.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  });

app.listen(PORT, () => {
    console.log(`server running on port: http://localhost:${PORT}`)
})