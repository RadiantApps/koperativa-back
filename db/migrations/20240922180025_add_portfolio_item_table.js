/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("portfolio_item", function (table) {
    table.increments("id");
    table.integer("portfolio_id").unsigned().notNullable();
    table.text("description").notNullable();
    table.text("title").nullable();
    table.text("subtitle").nullable();
    table.string("icon").nullable();
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
  return knex.schema.dropTable("portfolio_item");
};
