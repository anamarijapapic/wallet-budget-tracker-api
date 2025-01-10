const { hashPassword } = require('../../repo/user');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  const users = [
    { email: 'tbasic@mail.com' },
    { email: 'apapic@mail.com' },
    { email: 'pivancevic@mail.com' },
  ];

  for (const user of users) {
    user.password = await hashPassword('sifra123');
  }

  await knex('users').insert(users);
};
