/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("portfolio_content", (table) => {
    table.increments("id").primary();
    table.integer("portfolio_id").notNullable();
    table.enum("content_type", ["image", "text", "twoImages"]).notNullable();
    table.json("content_data").notNullable();
    table.integer("order").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("portfolio_content");
};
