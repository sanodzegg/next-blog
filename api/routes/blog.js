const express = require("express");
const blogRoutes = express.Router();
 
const dbo = require("../db/conn");
 
const ObjectId = require("mongodb").ObjectId;

const auth = require("../middlewares/auth");

blogRoutes.route("/blogs").get((req, res) => {
 const db_connect = dbo.getDb();
 db_connect
   .collection("blogs")
   .find({})
   .toArray((err, result) => {
     if (err) throw err;
     console.log(result.length);
     res.json(result);
   });
});

blogRoutes.route("/blogsby/:tag").get((req, response) => {
  const tag = req.params.tag;

  const db = dbo.getDb();
  db.collection("blogs").find({ tags: { $in: [tag] } }).toArray((err, res) => {
    if(err) throw err;
    if(res.length === 0) {
      response.status(200).send("No blogs found.");
    } else response.status(200).json(res);
  });
});

blogRoutes.route("/blogs/:page").get((req, response) => {
  const page = req.params.page;
  const db_connect = dbo.getDb();
  db_connect.collection("blogs").find({}).toArray((err, res) => {
    if(err) throw err;
    if(res.length !== 0) {
      const finalIndex = page * 6;
      const startingIndex = finalIndex - 6;
      const final = res.slice(startingIndex, finalIndex);
      if(final.length !== 0) response.status(200).json(final);
      else response.status(200).send("No blogs in database.");
    };
  });
});

blogRoutes.route("/blogs/user/:user").get((req, response) => {
  const username = req.params.user;
  
  const db_connect = dbo.getDb("blogs");
  const query = { author: username };
  db_connect.collection("blogs").find(query).toArray((err, res) => {
    if(err) throw err;
    response.status(200).send(res);
  });
});
 
blogRoutes.route("/blog/:id").get((req, response) => {
  const id = req.params.id;
  let db = dbo.getDb();
  db.collection("blogs").find({ _id: ObjectId(id) }).toArray((err, res) => {
    if(err) throw err;
    const views = res[0].views ? res[0].views : 0;
    const newvals = { $set: { views: (views + 1) } };
    db.collection("blogs").updateOne({ _id: ObjectId(id) }, newvals);
    response.status(200).send(res);
  });
});
 
blogRoutes.route("/blog/add").post(auth, (req, response) => {
  const data = req.body;
  const myObj = {
    author: data.user,
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

  db_connect.collection("blogs").find({ author: data.user }).toArray((err, result) => {
    if (err) throw err;
    const resultLength = result.length === 0 ? 1 : result.length;
    const blogs = result.length === 0 ? [myObj] : [...result];
    const newVals = { $set: { blogsQuantity: resultLength, blogs: blogs } };
    db_connect.collection("users").updateOne({ username: data.user }, newVals, (err, res) => {
      if(err) throw err;
      if(res) response.status(200);
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

blogRoutes.route("/featuredBlog").get((req, res) => {
  const db = dbo.getDb();
  db.collection("blogs").find({}).sort({ views: -1 }).limit(1).toArray((err, result) => {
    if(err) throw err;
    res.status(200).json(result);
  })
})
 
module.exports = blogRoutes;