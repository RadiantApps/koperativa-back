/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("portfolio_deliverables", function (table) {
    table.increments("id");
    table.integer("portfolio_id").unsigned().notNullable();
    table.string("name");
    table.integer("order");
    table.timestamps(true, true);

    table
      .foreign("portfolio_id")
      .references("id")
      .inTable("portfolio")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("portfolio_deliverables");
};
