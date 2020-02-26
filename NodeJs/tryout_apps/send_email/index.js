"use strict";
const nodemailer = require("nodemailer");

var emailMember = ''
var tokenMember = ''

module.exports = function getData(email, token) {
    emailMember = email
    tokenMember = token
}

async function main() {
    console.log(`${emailMember}     ${tokenMember}`)
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'tryoutub.official@gmail.com',
    //         pass: 'sandiinikuatl0'
    //     }
    // });

    // let info = await transporter.sendMail({
    //     from: "'Tryout ub Official' <tryoutub.official@gmail.com>",
    //     to: emailMember,
    //     subject: "Verifikasi Akun",
    //     // text: "Silakan verifikasi akun kamu dengan klik url dibawah ini.", // plain text body
    //     html: `<a href='https://google.com'>${tokenMember}</a>` // html body
    // });

    // console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);