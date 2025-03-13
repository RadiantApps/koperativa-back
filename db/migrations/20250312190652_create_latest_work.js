/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("latest_work", function (table) {
    table.increments("id").primary();
    table.integer("reference_id").notNullable();
    table.enum("type", ["work", "jobs", "news"]).notNullable();
    table.integer("order").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("latest_work");
};
