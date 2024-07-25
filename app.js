const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors")
const {PORT, HOST} = process.env;
const port = PORT || 3000;

const authRouter = require("./routers/auth.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use('/auth', authRouter)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server attivo su http://${HOST}:${port}`);
});