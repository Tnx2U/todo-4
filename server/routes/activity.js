var express = require("express");
var router = express.Router();
import { getAllActivity, postActivity } from "../apis/activity";

router.get("/", async function (req, res, next) {
  try {
    const activities = await getAllActivity();
    console.log("query result : ", activities);
    res.status(200).send({ success: true, data: activities });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ success: false });
  }
});

router.post("/", async function (req, res, next) {
  try {
    await postActivity(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ success: false });
  }
});

module.exports = router;
