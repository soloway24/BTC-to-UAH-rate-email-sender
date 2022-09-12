const axios = require("axios");
const HttpStatus = require("http-status-codes");

const getRateInUAH = (async (req, res) => {
    const result = await getBTCRateThirdParty();
    if(result["error"] !== undefined) {
        res.status(HttpStatus.BAD_REQUEST)
            .json(result);
    } else {
        res.json(result);
    }
})

const getBTCRateThirdParty = (async () => {
    const options = {
        method: 'GET',
        url: process.env.RAPID_API_URL,
        params: {ids: 'bitcoin', vs_currencies: 'uah'},
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }
    };

    let result = {};

    await axios.request(options).then( response => {
        result = response.data;
    }).catch( error => {
        result = error;
    });

    if(result["bitcoin"] !== undefined)
        return result["bitcoin"]["uah"];
    else
        return {error : "Invalid status value."};
})

module.exports = {
    getRateInUAH,
    getBTCRateThirdParty
}
