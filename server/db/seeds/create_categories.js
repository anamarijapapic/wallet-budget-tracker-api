/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex('categories').insert([
    { name: 'Income' },
    { name: 'Food & Drinks' },
    { name: 'Shopping' },
    { name: 'Housing' },
    { name: 'Transportation' },
    { name: 'Vehicle' },
    { name: 'Life & Entertainment' },
    { name: 'Communication, PC' },
    { name: 'Financial Expenses' },
    { name: 'Investments' },
    { name: 'Others' },
  ]);
};
