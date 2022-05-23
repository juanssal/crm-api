const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
var cors = require("cors");
const app = express();
const port = 3001;

app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// COMMENTS
app.get("/comments", db.getComments);
app.get("/comments/deals/:deal", db.getCommentsByDeal);
app.get("/comments/users/:user", db.getCommentsByUser);
app.post("/comments/", db.createComment);
app.delete("/comments/id/:comment", db.deleteComment);

//DEALS
app.get("/deals", db.getDeals);
app.get("/deals/id/:deal", db.getDealsById);
app.get("/deals/users/:user", db.getDealsByUser);
app.get("/deals/customers/:customer", db.getDealsByCustomer);
app.get("/deals/overview/:limit", db.getDealOverview);
app.get("/deals", db.createDeal);
app.get("/deals/id/:deal", db.updateDeal);
app.get("/deals/id/:deal", db.deleteDeal);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
