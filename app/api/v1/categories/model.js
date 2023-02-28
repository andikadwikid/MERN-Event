const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [20, "Name must be at most 20 characters long"],
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
