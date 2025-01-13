const CustomError = require('../customError');
const db = require('../db');

async function get() {
  try {
    return await db('categories').select();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function getById(categoryId) {
  try {
    const category = await db('categories').where({ id: categoryId }).first();
    if (!category) {
      throw new CustomError(
        404,
        `Category with id ${categoryId} does not exist.`
      );
    }
    return category;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function create(body) {
  try {
    const createdCategoryId = (
      await db('categories').insert({
        name: body.name,
      })
    )?.[0];
    return await getById(createdCategoryId);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function remove(categoryId) {
  try {
    await getById(categoryId);
    return await db('categories').where({ id: categoryId }).del();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

module.exports = {
  get,
  getById,
  create,
  remove,
};
