const {
    subscribeEmail,
    subscribedEmails
} = require("../services/email.service")
const {
    getBTCRateThirdParty
} = require("./bitcoin.controller");
const sgMail = require("@sendgrid/mail");
const HttpStatus = require('http-status-codes');
require('dotenv').config({path:__dirname+'/.env'});

const subscribe = (async (req, res) => {
    const email = req.body.email;
    console.log(email);
    const result = await subscribeEmail(email);
    if(result["error"] !== undefined) {
        res.status(HttpStatus.CONFLICT).json(result);
    } else {
        res.json(result);
    }
})

const sendEmails = (async (req, res) => {
    const users = await subscribedEmails();
    if(users.length === 0) {
        res.json("No users to send emails to.");
        return;
    }

    const btcRateData = await getBTCRateThirdParty();

    if(btcRateData["error"] !== undefined){
        res.status(HttpStatus.BAD_REQUEST)
            .json("Emails not sent. Invalid status value");
    } else {
        const message = "Current BTC rate: " + btcRateData + " UAH.";
        const result = await send(message, users).then();
        console.log(result);
        if(result["error"] !== undefined) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(result);
        } else {
            res.json(result);
        }
    }
})

async function send(message, addresses) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    let success = true;

    for(const address of addresses) {
        const msg = {
            to: address,
            from: process.env.FROM_EMAIL,
            subject: "BTC rate in UAH",
            text: message
        };

        await sgMail
            .send(msg)
            .then(() => {}, error => {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body);
                }
                success = false;
            });
    }
    if(success) {
        return {result : "Emails sent."};
    } else {
        return {error : "Some or all emails have not been sent."};
    }
}

module.exports = {
    subscribe,
    sendEmails
}