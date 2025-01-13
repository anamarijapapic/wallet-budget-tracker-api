const cc = require('currency-codes');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('funds', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.enu('currency', cc.codes()).notNullable().defaultTo('EUR');
    table.decimal('balance', 15, 2).notNullable().defaultTo(0);
    table.integer('user_id').unsigned().notNullable();
    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('funds');
};
