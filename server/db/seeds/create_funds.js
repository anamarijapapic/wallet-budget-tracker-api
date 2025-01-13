/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('funds').del();
  const funds = [
    { name: "tbasic's Default Fund", balance: 1000, user_id: 1 },
    { name: "apapic's Default Fund", balance: 12.99, user_id: 2 },
    { name: "pivancevic's Default Fund", balance: 3333.33, user_id: 3 },
  ];
  await knex('funds').insert(funds);
};
