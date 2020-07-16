var express = require("express");
var router = express.Router();
import { getInitialData } from "../apis/initialize";
/* GET home page. */
router.get("/", async function (req, res, next) {
  getInitialData();
  res.render("index");
});

module.exports = router;
