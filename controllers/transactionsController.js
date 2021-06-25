const express = require("express");
const transactions = express.Router();
transactionArray = require("../models/transactions.js");

const validateUrl = (req, res, next) => {
  const http = "http://";
  const https = "https://";
  var fullUrl = req.protocol + "://" + req.get("host") + req.url;
  if (fullUrl.substring(0, 7) === http || fullUrl.substring(0, 8) === https) {
    return next();
  } else {
    res
      .status(400)
      .send(`Error: url should start with with http:// or https://`);
  }
};

transactions.use(validateUrl);

transactions.get("/", (req, res) => {
  res.json(transactionArray);
});

transactions.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (transactionArray[arrayIndex]) {
    res.json(transactionArray[arrayIndex]);
  } else {
    res.redirect("/404");
  }
});

transactions.post("/", validateUrl, (req, res) => {
  transactionArray.push(req.body);
  res.json(transactionArray[transactionArray.length - 1]);
});

transactions.delete("/:indexArray", (req, res) => {
  const deletedTransaction = transactionArray.splice(req.params.indexArray, 1);
  res.status(200).json(deletedTransaction);
});

transactions.put("/:arrayIndex", (req, res) => {
  transactionArray[req.params.arrayIndex] = req.body;
  res.status(200).json(transactionArray[req.params.arrayIndex]);
});

module.exports = transactions;
