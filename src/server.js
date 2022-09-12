const express = require("express");
const bitcoinRouter = require("./routes/bitcoin.router")
const emailRouter = require("./routes/email.router")

const app = express();
const port = 8080;
const apiPath = "/api";

app.listen(port,() => {
    console.log(`App listening on port ${port}`)
})

app.use(express.json());
app.use(apiPath, bitcoinRouter, emailRouter)