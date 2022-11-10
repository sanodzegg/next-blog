const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPT);

const verifyCookie = (user, cookie) => {
    return new Promise((resolve, reject) => {
        if(!cookie || !user) reject("No valid arguments provided.");
        else {
            const dehashed = cryptr.decrypt(cookie);
            resolve(dehashed === user);
        };
    });
}

module.exports = verifyCookie;