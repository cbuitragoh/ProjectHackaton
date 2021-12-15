const { sendEmail } = require("./nodemailer");

exports.sendMail = async (req, res, next) => {
    var mailData = req.body;

    
    await sendEmail(mailData, (err, info) => {
        if (err) {
            res.status(500).send(err.message || err);
        } else {
            res.status(200).send();
        }
    })
}