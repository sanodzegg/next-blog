const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
let _db;
 
module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (db)
      {
        _db = db.db("data");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err); 
    });
  },
 
  getDb: function () {
    return _db;
  },
};