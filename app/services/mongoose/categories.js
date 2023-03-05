const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find();

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name: name.toLowerCase() });

  if (check) throw new BadRequestError("Category already exists");

  const result = await Categories.create({ name: name.toLowerCase() });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Category id ${id} not found`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id yang berbeda dengan id yang dikirim dari client (req.params.id)
  // nama yang sama di id yang berbeda
  const check = await Categories.findOne({
    name: name.toLowerCase(),
    _id: { $ne: id },
  });

  // jika ada, maka throw error (karena tidak boleh ada categories dengan nama yang sama)
  if (check) throw new BadRequestError("Category already exists");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name: name.toLowerCase() },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Category id ${id} not found`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Category id ${id} not found`);

  await result.deleteOne();

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
};
