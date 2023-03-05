const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const categoriesRouter = require("./app/api/v1/categories/router");

const v1 = "/api/v1/cms";

const notFoundMiddleware = require("./app/middleware/not-found");
const errorHandlerMiddleware = require("./app/middleware/handle-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
app.use(v1, categoriesRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

module.exports = app;
