var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var initializeRouter = require("./routes/initialize");
var columnOrderRouter = require("./routes/column_order");
var cardRouter = require("./routes/cards");
var columnRouter = require("./routes/column");
var app = express();

require("dotenv").config();
app.set("views", path.join(__dirname, "../client/public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/init", initializeRouter);
app.use("/column_order", columnOrderRouter);
app.use("/card", cardRouter);
app.use("/column", columnRouter);
app.use(express.static(path.join(__dirname, "../client")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
