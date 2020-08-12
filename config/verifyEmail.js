// Dependencies
var nodemailer = require("nodemailer");
const dotenv = require('dotenv')

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "parkorpetter107@gmail.com",
        pass: "8864933491anas"
    },
    tls: {
        rejectUnauthorized: false,
    }
});

var rand, mailOptions, host, link;

module.exports.verifyEmail = (SenderHost, reciever) => {
    rand = Math.floor((Math.random() * 100) + 54);
    let status = false;
    host = SenderHost, 
        link = "http://" + host + "/sign_in/verify?id=" + rand;
    mailOptions = {
        from: "Anas Hussain <parkorpetter107@gmail.com>", //Sender
        to: reciever, //Reciever
        subject: "Please confirm your Email account", //Subject
        html: `<strong>Welcome to Gambo</strong>.<br> Some Greate things are  just a click  away. Please Click on the link to verify your email. <a href="${link}">Click here to verify</a>` //Message
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            status = false;
            console.log(error);
        } else {           
            status = true;
            console.log(nodemailer.getTestMessageUrl(response));
            console.log(`Message Sent! Id: ${response.messageId}\nMessage: ${response.message}`);
        }
    });
    return [rand,status];
}



