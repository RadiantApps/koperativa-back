/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("next_post", function (table) {
    table.increments("id").primary();
    table.integer("portfolio_id").notNullable();
    table.json("content_data").nullable();
    table.integer("nextId").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("next_post");
};
