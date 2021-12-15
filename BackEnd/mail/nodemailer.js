var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'crehaceco@gmail.com',
        pass: 'crehace2021'
    }
});

exports.sendEmail = async(mailOptions, callback) => {
    transporter.sendMail(mailOptions, callback)
} 