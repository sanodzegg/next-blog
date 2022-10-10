const express = require("express");
const nodemailer = require("nodemailer");

const mailRoutes = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

mailRoutes.route("/sendmail").post((req, res) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `${req.body.subject} | from: ${req.body.email}`,
        text: `${req.body.message}\nName: ${req.body.name}\nPhone Number: ${req.body.phone}`
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            res.send(err);
        } else res.status(200).send(info);
    });
});

module.exports = mailRoutes;