const express = require("express");
const blogRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;

const auth = require("../middlewares/auth");

blogRoutes.route("/blogs").get((req, res) => {
 const db_connect = dbo.getDb("blogs");
 db_connect
   .collection("blogs")
   .find({})
   .toArray((err, result) => {
     if (err) throw err;
     res.json(result);
   });
});

blogRoutes.route("/blogs/:page").get((req, response) => {
  const page = req.params.page;
  const db_connect = dbo.getDb();
  db_connect.collection("blogs").find({}).toArray((err, res) => {
    if(err) throw err;
    const finalIndex = page * 6;
    const startingIndex = finalIndex - 6;
    const final = res.slice(startingIndex, finalIndex);
    response.status(200).json(final);
  });
});

blogRoutes.route("/blogs/user/:user").get((req, response) => {
  const userId = req.params.user;
  
  const db_connect = dbo.getDb("blogs");
  const query = { user: userId };
  db_connect.collection("blogs").find(query).toArray((err, res) => {
    if(err) throw err;
    response.status(200).send(res);
  });
});
 
blogRoutes.route("/blog/:id").get((req, res) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("blogs")
   .findOne(myquery, (err, result) => {
     if (err) throw err;
     res.json(result);
   });
});
 
blogRoutes.route("/blog/add").post(auth, (req, response) => {
  const data = req.body;
  const myObj = {
    user: data.user,
    date: data.date,
    readTime: data.readTime,
    title: data.title,
    description: data.description,
    story: data.story,
    tags: data.tags
  }

  let db_connect = dbo.getDb();
  db_connect.collection("blogs").insertOne(myObj, (err, res) => {
    if (err) throw err;
    response.status(200).send("Blog added succesfully.");
  });

  db_connect.collection("blogs").find({ user: data.user }).toArray((err, res) => {
    if (err) throw err;
    const newVals = { $set: { blogs: res.length } };
    db_connect.collection("users").updateOne({ _id: ObjectId(data.user) }, newVals, (err, res) => {
      if(err) throw err;
      response.status(200);
    });
  });
});
 
blogRoutes.route("/update/:id").post((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("blogs")
   .updateOne(myquery, newvalues, (err, res) => {
     if (err) throw err;
     response.json(res);
   });
});
 
blogRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("blogs").deleteOne(myquery, (err, obj) => {
   if (err) throw err;
   response.json(obj);
 });
});
 
module.exports = blogRoutes;