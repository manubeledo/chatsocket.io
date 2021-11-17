// Function to create table

exports.up = function(knex) {
    return knex.schema
    .createTable('messages', table => {
        table.increments(); // Me va aumentando el id 
        table.text('email', 128).notNullable();
        table.text('mensaje', 128).notNullable();
        table.timestamps(true, true);
    })
    .createTable('products', table => {
        table.increments(); // Me va aumentando el id 
        table.text('title', 128).notNullable();
        table.string('description', 1000).notNullable();
        table.string('thumbnail', 1000).notNullable();
    });
};
      
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('messages').dropTableIfExists
    .dropTableIfExists('products').dropTableIfExists
};
  