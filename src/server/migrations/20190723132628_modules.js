exports.up = function(knex) {
  return knex.schema.createTable("modules", table => {
    table.increments();
    table.string("title").notNullable();
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table
      .integer("class_id")
      .unsigned()
      .references("id")
      .inTable("classes")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("modules");
};
