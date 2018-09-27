const nodemailer = require('nodemailer');
module.exports = {
    sendEmail : (email) => {

        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "testmongodb@outlook.com", // generated ethereal user
                    pass: "Testas2111" // generated ethereal password
                },
                tls:{
                        ciphers:'SSLv3'

                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: "testmongodb@outlook.com", // sender address
                to: email, // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: `<a href="http://localhost:3000/confirmNewsletter/${email}">bekræft Email</a>
                <br><a href="http://localhost:3000/removeNewsletter/${email}">med ud af nyhedsbrev</a>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
}
