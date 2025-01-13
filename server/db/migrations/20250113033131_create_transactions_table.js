/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id');
    table.string('description').notNullable();
    table.decimal('amount', 15, 2).notNullable();
    table.integer('fund_id').unsigned().notNullable();
    table.integer('category_id').unsigned().notNullable();
    table.timestamps(true, true);

    table.foreign('fund_id').references('id').inTable('funds');
    table.foreign('category_id').references('id').inTable('categories');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
