import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());


app.get("/", (req, res) => {

    if(req.url) {
        
        res.send("hello world")
    }
})

app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log(`server running on port: http://localhost:${PORT}`)
})