const express = require("express");

const authRouter = require('./routers/auth')

const app = express();
require("dotenv").config();

const cors = require("cors")

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h1>Hello World!</h1>
        <a href="/auth/login">Login</a>
    `);
})

app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});