const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(require("./routes/blog"));
app.use(require("./routes/mailer"));
app.use(require("./routes/user"));

const dbo = require("./db/conn");
 
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});