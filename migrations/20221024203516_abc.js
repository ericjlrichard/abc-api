/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    
    .createTable("boxer", (table) => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("description").notNullable();
      table.string("nickname");
      table.string("img");
    })
    .createTable("action_type", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description")
    })
    .createTable("action", (table) => {
      table.increments("id").primary();
      table.string("code", 2).notNullable();
      table.string("name").notNullable();
      table.string("description").notNullable();
    })
    .createTable("action_by_type", (table) => {
      table.increments("id").primary();
      table.integer("action_id").unsigned().references("id").inTable("action");
      table.integer("action_type_id").unsigned().references("id").inTable("action_type")
    })
    .createTable("combo", (table) => {
      table.increments("id").primary();
      table.string("combo_string").notNullable();
      table.string("name").notNullable();
      table.integer("boxer_id").unsigned().references("id").inTable("boxer").onUpdate("CASCADE").onDelete("CASCADE")
      table.string("description");
    })
    .createTable("workout", (table) => {
      table.increments("id").primary();
      table.string("name");
    })
    .createTable("round", (table) => {
      table.increments("id").primary();
      table.string("type").notNullable();
    })
    .createTable("user", (table)=> {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("handle").notNullable();
      table.string("password").notNullable();
      
    })
    .createTable("settings", (table) => {
      table.increments("id").primary();
      table.boolean("classic").notNullable().defaultTo(true);
      table.boolean("random").notNullable().defaultTo(true);
      table.boolean("signatures").notNullable().defaultTo(true);
      table.integer("default_workout_id").unsigned().references("id").inTable("workout");
      table.boolean("southpaw").notNullable().defaultTo(false);
      table.integer("user_id").unsigned().notNullable().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE")
    })
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("settings").dropTable("user").dropTable("workout").dropTable("combo").dropTable("action_by_type").dropTable("action_type").dropTable("action").dropTable("round").dropTable("boxer")
};
