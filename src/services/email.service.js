const {
    getSubscribedEmails,
    addSubscribedEmail
} = require("../repositories/email.repository")

const subscribeEmail = (async (email) => {
    if(!isValidEmail(email)) {
        return {error : "Invalid email."}
    }
    return await addSubscribedEmail(email);
})

const subscribedEmails = (async () => {
    return await getSubscribedEmails();
})

const isValidEmail = ((email) => {
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(emailFormat);
})


module.exports = {
    subscribeEmail,
    subscribedEmails
}