var express = require("express");
var router = express.Router();
import { getInitialData } from "../apis/initialize";
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const initialData = await getInitialData();
    console.log("initialDAta : ", JSON.stringify(initialData));
    res.status(200).send({ success: true, data: initialData });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

module.exports = router;
