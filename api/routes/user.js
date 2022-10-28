const express = require("express");
const userRoutes = express.Router();
const auth = require("../middlewares/auth");

const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('vepkhistkaosani');

const ObjectId = require("mongodb").ObjectId;

userRoutes.route("/register").post((req, response) => {
    const { username, email, password } = req.body;

    let db_connect = dbo.getDb();

    const passphrase = cryptr.encrypt(password);
    
    let myobj = { username, email, passphrase, picture: null, aboutMe: null };

    db_connect.collection("users").find({}).toArray((err, result) => {
        if(err) throw err;
        let errtext;
        result.forEach(e => {
            if(e.username === myobj.username) {
                errtext = "Username already taken.";
            } else if (e.email === myobj.email) {
                errtext = "User with this email address already exists.";
            }
        });
        if(errtext) {
            response.status(409).send(errtext);
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
            const decrypted = cryptr.decrypt(user.passphrase);
            const passed = decrypted === password;
            if(!passed) {
                response.status(400).send("Password invalid, try again.");
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
            const { _id, username, email, picture, aboutMe } = user;
            resp.status(200).json({ _id, username, email, picture, aboutMe });
        }
    });
});

userRoutes.route("/user/update").post(auth, (req, response) => {
    const { img, originalImage, username, originalUser, aboutMe } = req.body;

    let db_connect = dbo.getDb();

    const newvals = { $set: { picture: img ? img : originalImage, username: username ? username : originalUser, aboutMe: aboutMe ? aboutMe : null } };

    db_connect.collection("users").find({username: username}).toArray((err, result) => {
        if(result.length > 0) {
            response.status(409).send("Username already exists.");
            return;
        } else {
            db_connect.collection("users").updateOne({username: originalUser}, newvals, (err, res) => {
                if(err) throw err;
                response.status(200).send("Profile edit successful.");
            });
        }
    })
});

userRoutes.route("/user/password").post(auth, (req, response) => {
    const { oldPass, newPass, userid } = req.body;
    
    let db_connect = dbo.getDb();

    if(oldPass === newPass) {
        response.status(401).send("New password can not be the same as old password.");
        return;
    }

    let myquery = { _id: ObjectId(userid) };
    db_connect.collection("users").find(myquery).toArray((err, result) => {
        if(!err || !result.length === 0) {
            const userpass = result[0].passphrase;
            const decrypted = cryptr.decrypt(userpass);
            const passed = oldPass === decrypted;
            if(passed) {
                const newvals = { $set: { passphrase: cryptr.encrypt(newPass) } }
                db_connect.collection("users").updateOne({_id: ObjectId(userid)}, newvals, (err, res) => {
                    if(err) throw err;
                    response.status(200).send("Password updated successfully.");
                });
            }
        }
    });
});

userRoutes.route("/featuredUsers").get((req, response) => {
    let db_connect = dbo.getDb();
    db_connect.collection("users").find({}).toArray((err, res) => {
        if(err) throw err;
        const usersWithBlogs = res.filter(e => e.blogs);
        const sorted = usersWithBlogs.sort((a, b) => b.blogs - a.blogs);
        const final = [];
        sorted.forEach(e => {
            final.push({ username: e.username, picture: e.picture })
        })
        response.status(200).send(final);
    });
});

module.exports = userRoutes;