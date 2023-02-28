const mongoose = require("mongoose");

const { urlDb } = require("../config");

mongoose.connect(urlDb);
mongoose.set("strictQuery", true);

const db = mongoose.connection;

module.exports = db;
