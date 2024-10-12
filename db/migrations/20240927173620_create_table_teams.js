/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("teams", (table) => {
    table.increments("id").primary();
    table.string("name").nullable();
    table.string("surname").nullable();
    table.string("title").nullable();
    table.string("subtitle").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("teams");
};
