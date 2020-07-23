var express = require("express");
var router = express.Router();
import { putColumn } from "../apis/column.js";

router.put("/:column_id/title", async function (req, res, next) {
  try {
    await putColumn(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ success: false });
  }
});

module.exports = router;
