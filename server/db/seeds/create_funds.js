/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('funds').del();
  const funds = [
    { name: 'Fond za hitne troskove', balance: 1000.55, user_id: 1 },
    { name: 'Fond za putovanja', balance: 2000.44, user_id: 2 },
    { name: 'Fond za poklone i blagdane', balance: 3000.33, user_id: 3 },
  ];
  await knex('funds').insert(funds);
};
