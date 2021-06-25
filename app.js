const express = require("express");
const cors = require("cors");

const transactionsController = require("./controllers/transactionsController.js");
const transactions = require("./models/transactions.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/transactions", transactionsController);

app.get("/", (req, res) => {
  res.send("Welcome to the Budgeting App!");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
