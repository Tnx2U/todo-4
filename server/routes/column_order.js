var express = require("express");
var router = express.Router();
import { putColumnOrder } from "../apis/column_order.js";

router.put("/drag_and_drop", async function (req, res, next) {
  try {
    console.log("req.body in routes", req.body);
    await putColumnOrder(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    //204, 404구분
    res.status(404).send({ success: false });
  }
});

module.exports = router;
