const express = require("express");
const bodyParser = require("body-parser");
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
app.get("/deals/overview/", db.getDealOverview);
app.get("/deals/overview/:limit", db.getDealOverviewWithLimit);
app.post("/deals", db.createDeal);
app.put("/deals/general/:deal", db.updateDeal);
app.delete("/deals/id/:deal", db.deleteDeal);

// CUSTOMERS
app.get("/customers", db.getCustomers);
app.post("/customers", db.createCustomer);
app.put("/customers/:customer", db.updateCustomer);
app.delete("/customers/:customer", db.deleteCustomer);

// USERS
app.get("/users", db.getUsers);
app.put("/users/:id", db.updateUser)


app.listen(PORT, () => console.log(`listening on ${PORT}`));


