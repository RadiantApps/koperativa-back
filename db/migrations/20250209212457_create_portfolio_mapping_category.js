/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "portfolio_mapping_category",
    function (table) {
      table.increments("id").primary();
      table.integer("portfolio_id").unsigned().notNullable();
      table.integer("category_id").unsigned().notNullable();
      table
        .foreign("portfolio_id")
        .references("id")
        .inTable("portfolio")
        .onDelete("CASCADE");
      table
        .foreign("category_id")
        .references("id")
        .inTable("category_work")
        .onDelete("CASCADE");
      table.unique(["portfolio_id", "category_id"]);
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("portfolio_mapping_category");
};
