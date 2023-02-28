const Categories = require("./model");

const index = async (req, res) => {
  try {
    const result = await Categories.find();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const find = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Categories.findOne({ _id: id });

    !result && res.status(404).json({ message: "Id categories is Not Found" });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Categories.create({ name });
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Categories.findOneAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Categories.findOneAndRemove({ _id: id });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  index,
  find,
  create,
  update,
  destroy,
};
