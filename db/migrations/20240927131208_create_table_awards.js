/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("awards", (table) => {
    table.increments("id").primary();
    table.text("organization").nullable();
    table.string("project").nullable();
    table.string("award").nullable();
    table.string("year").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("awards");
};
