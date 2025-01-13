const CustomError = require('../customError');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function comparePasswords(password, hash) {
  return bcrypt.compare(password, hash);
}

function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '3h',
  });
}

async function get() {
  try {
    return await db('users').select();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function getById(userId) {
  try {
    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      throw new CustomError(404, `User with id ${userId} does not exist.`);
    }
    return user;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function getByEmail(email) {
  try {
    return await db('users').where({ email }).first();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function create(body) {
  try {
    const createdUserId = (
      await db('users').insert({
        email: body.email,
        password: await hashPassword(body.password),
      })
    )?.[0];

    return await getById(createdUserId);
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
  getByEmail,
  create,
  hashPassword,
  comparePasswords,
  generateToken,
};
