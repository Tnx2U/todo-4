var express = require("express");
var router = express.Router();
import { postCard } from "../apis/card.js";

router.post("/", async function (req, res, next) {
  try {
    await postCard(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ success: false });
  }
});

module.exports = router;
