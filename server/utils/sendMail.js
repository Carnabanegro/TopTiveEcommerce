const {sign} = require("jsonwebtoken");
const mailgun = require("mailgun-js");
require('dotenv').config();
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN});
const sendMail = async (username,password,email) =>{

    const token = sign({username,password,email}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '60m'})

    const data = {
        from: 'noreply@eCommerceStore.com',
        to: email,
        subject: 'Email Confirmation',
        html: `
                <h2>Click on the link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
            `
    };

    return new Promise((resolve,reject) =>{
        mg.messages().send(data,(error,body) =>{
            if (error) {
                reject(error)
                return
            }
            resolve()
        });
    })

}

module.exports = {sendMail}