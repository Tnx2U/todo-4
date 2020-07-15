var express = require("express");
var router = express.Router();
const db = require("../db/db.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  db.dbtest();
  res.render("index");
});

module.exports = router;
