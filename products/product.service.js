const db = require('../_helpers/db');

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await db.Product.findAll();
}

async function getById(id) {
  return await getProduct(id);
}

async function create(params) {
  // Validate if the product with the same name already exists
  if (await db.Product.findOne({ where: { name: params.name } })) {
    throw 'Product with the same name already exists';
  }

  // Create a new product
  return await db.Product.create(params);
}

async function update(id, params) {
  const product = await getProduct(id);

  // Validate if the product name is being changed to an existing one
  if (params.name && params.name !== product.name) {
    if (await db.Product.findOne({ where: { name: params.name } })) {
      throw 'Product with the same name already exists';
    }
  }

  // Update the product
  Object.assign(product, params);
  await product.save();

  return product;
}

async function _delete(id) {
  const product = await getProduct(id);
  await product.destroy();
}

// Helper function to get a product by ID
async function getProduct(id) {
  const product = await db.Product.findByPk(id);
  if (!product) throw 'Product not found';
  return product;
}
