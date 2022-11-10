const express = require("express");
const nodemailer = require("nodemailer");

const mailRoutes = express.Router();

const dbo = require("../db/conn");

const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");

const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPT);

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

mailRoutes.route("/forgot/:username").get((req, response) => {
    const username = req.params.username;
    
    const db = dbo.getDb();

    db.collection("users").find({ username: username }).toArray((err, res) => {
        if(!err && res.length > 0) {
            const { username, email } = res[0];
            const hash = cryptr.encrypt(username);
            response.cookie('resetAuth', hash, { maxAge: 300000, httpOnly: true, secure: true });
            response.cookie('user', username, { maxAge: 300000, httpOnly: true, secure: true });
            response.status(200).json({ email: email });

            const newPath = path.join(__dirname + "/../assets/resetDesign.html");

            fs.readFile(newPath, { encoding: "utf-8" }, (err, html) => {
                if(err) throw err;

                const template = handlebars.compile(html);
                const replacements = {
                    username: username,
                }

                const htmlToSend = template(replacements);

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Reset your account password",
                    html: htmlToSend
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if(error) throw error;
                    res.status(200).send(info)
                })
            });
        } else throw err;
    });
})

module.exports = mailRoutes;