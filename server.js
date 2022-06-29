const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const db = require("./queries");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

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
app.get("/api/comments", db.getComments);
app.get("/api/comments/deals/:deal", db.getCommentsByDeal);
app.get("/api/comments/users/:user", db.getCommentsByUser);
app.post("/api/comments/", db.createComment);
app.delete("/api/comments/id/:comment", db.deleteComment);

//DEALS
app.get("/api/deals", db.getDeals);
app.get("/api/deals/id/:deal", db.getDealsById);
app.get("/api/deals/users/:user", db.getDealsByUser);
app.get("/api/deals/customers/:customer", db.getDealsByCustomer);
app.get("/api/deals/overview/", db.getDealOverview);
app.get("/api/deals/overview/:limit", db.getDealOverviewWithLimit);
app.post("/api/deals", db.createDeal);
app.put("/api/deals/general/:deal", db.updateDeal);
app.delete("/api/deals/id/:deal", db.deleteDeal);

// CUSTOMERS
app.get("/api/customers", db.getCustomers);
app.post("/api/customers", db.createCustomer);
app.put("/api/customers/:customer", db.updateCustomer);
app.delete("/api/customers/:customer", db.deleteCustomer);

// USERS
app.get("/api/users", db.getUsers);
app.get("/api/users/:id", db.getUserById)

app.put("/api/users/:id", db.updateUser)


app.listen(PORT, () => console.log(`listening on ${PORT}`));


