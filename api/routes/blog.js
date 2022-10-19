const express = require("express");
 
const blogRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;

blogRoutes.route("/blogs").get((req, res) => {
 let db_connect = dbo.getDb("blogs");
 db_connect
   .collection("blogs")
   .find({})
   .toArray((err, result) => {
     if (err) throw err;
     res.json(result);
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
 
blogRoutes.route("/blog/add").post((req, response) => {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("blogs").insertOne(myobj, (err, res) => {
   if (err) throw err;
   response.json(res);
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