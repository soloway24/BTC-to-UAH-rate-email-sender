const fs = require('fs');
const emailsFileLocation = __dirname+"/../dbs/emails.txt";

const getSubscribedEmails = (async () => {
    let emails;
    try {
        const data = fs.readFileSync(emailsFileLocation);
        if(data.toString() === ''){
            emails = [];
        } else {
            emails = data.toString().split(/\r?\n/);
            emails.pop();
            console.log(emails);
        }
    } catch (err) {
        console.error(err);
    }
    return emails;
})

const addSubscribedEmail = (async (email) => {
    if(await checkIfEmailIsPresent(email)) {
        return {error : "Email is already subscribed."};
    }
    try {
        const content = email + "\n";
        await fs.appendFileSync(emailsFileLocation, content);
        return {result : "Email " + email + " subscribed."};
    } catch (err) {
        console.log(err);
        return {error : err};
    }

})

const checkIfEmailIsPresent = (async (email) => {
    const emails = await getSubscribedEmails();
    return emails.includes(email);
})

module.exports = {
    getSubscribedEmails,
    addSubscribedEmail
}
