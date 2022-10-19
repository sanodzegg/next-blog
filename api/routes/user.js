const express = require("express");
const userRoutes = express.Router();
const auth = require("../middlewares/auth");

const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");
const bcrypt = require('bcryptjs');

const ObjectId = require("mongodb").ObjectId;

userRoutes.route("/register").post((req, response) => {
    const { username, email, password } = req.body;

    let db_connect = dbo.getDb();

    const salt = bcrypt.genSaltSync(10);
    const passphrase = bcrypt.hashSync(password, salt);
    
    let myobj = { id: uuidv4(), username, email, passphrase };

    db_connect.collection("users").find({}).toArray((err, result) => {
        if(err) throw err;
        let errtext;
        result.forEach(e => {
            if(e.username === myobj.username) {
                errtext = { text: "Username already taken.", code: 0 }
            } else if (e.email === myobj.email) {
                errtext = { text: "User with this email address already exists.", code: 1 }
            }
        });
        if(errtext) {
            response.status(400).json(errtext);
        } else {
            db_connect.collection("users").insertOne(myobj, (err, res) => {
              if (err) throw err;
              response.json(res);
            });
        }
    });
});

userRoutes.route("/login").post((req, response) => {
    const { username, password } = req.body;

    let db_connect = dbo.getDb();

    db_connect.collection("users").find({ username: username }).toArray((err, result) => {
        if(err || result.length === 0) { 
            response.status(400).send("User doesn't exist.");
        } else {
            const user = result[0];
            const passed = bcrypt.compareSync(password, user.passphrase);
            if(!passed) {
                response.status(400).json({ text: "Password invalid, try again.", code: 1 })
            } else {
                const { username, email } = user;
                const token = jwt.sign(
                    { username, email },
                    process.env.TOKEN_KEY,
                    { expiresIn: "2h" }
                );
                const newUser = {
                    username, email, token, id: user._id
                }
                response.status(200).json({ response: "User login successful.", user: newUser });
            };
        };
    });
});

userRoutes.route("/user/:userid").get(auth, (req, resp) => {
    let db_connect = dbo.getDb();

    let myquery = { _id: ObjectId(req.params.userid) };
    
    db_connect.collection("users").find(myquery).toArray((err, result) => {
        if(!err || !result.length === 0) {
            const user = result[0];
            const { _id, username, email, picture } = user;
            resp.status(200).json({ _id, username, email, picture });
        }
    });
});

userRoutes.route("/user/update").post(auth, (req, response) => {
    const { img, username, originalUser } = req.body;

    let db_connect = dbo.getDb();

    const newvals = { $set: { picture: img, username: username ? username : originalUser } };

    db_connect.collection("users").updateOne({username: originalUser}, newvals, (err, res) => {
        if(err) throw err;
        response.status(200).send("Profile edit successful.");
    });
});

module.exports = userRoutes;