import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded(
        {
            extended : true
        }
    )
)

app.use("/api", userRoutes);

app.get("/", (req, res) => {

    if(req.url) {
        
        res.send("hello world")
    }
})

app.listen(PORT, () => {
    console.log(`server running on port: http://localhost:${PORT}`)
})