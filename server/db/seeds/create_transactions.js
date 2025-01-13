/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('transactions').del();
  await knex('transactions').insert([
    { amount: 1200, description: 'Salary', fund_id: 1, category_id: 1 },
    {
      amount: -3.2,
      description: 'Staropramen (Caffe Bar Firma)',
      fund_id: 1,
      category_id: 2,
    },
    { amount: -27.98, description: 'Groceries', fund_id: 1, category_id: 3 },
    { amount: -1000, description: 'Rent', fund_id: 1, category_id: 4 },
    { amount: -9.15, description: 'Internet', fund_id: 1, category_id: 5 },
    {
      amount: -200,
      description: 'Vehicle Maintenance',
      fund_id: 2,
      category_id: 6,
    },
    { amount: -7.99, description: 'Netflix', fund_id: 3, category_id: 7 },
    {
      amount: -51.41,
      description: 'Phone & Internet Bill',
      fund_id: 3,
      category_id: 8,
    },
    { amount: -500, description: 'Savings', fund_id: 3, category_id: 9 },
  ]);
};
