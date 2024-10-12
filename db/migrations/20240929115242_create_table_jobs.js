/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("jobs", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("city").notNullable();
    table.enum("job_type", ["part-time", "full-time"]).notNullable();
    table.text("description").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("jobs");
};
