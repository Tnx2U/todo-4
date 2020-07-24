var express = require("express");
var router = express.Router();
import { postCard, putCard, deleteCard } from "../apis/card.js";

router.put("/:card_id/note", async function (req, res, next) {
  try {
    await putCard(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ success: false });
  }
});

router.delete("/:card_id", async function (req, res, next) {
  try {
    console.log("access deletecard", req.body);
    await deleteCard(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ success: false });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const result = await postCard(req.body);
    res.status(200).send(Object.assign(result, { success: true }));
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ success: false });
  }
});

module.exports = router;
