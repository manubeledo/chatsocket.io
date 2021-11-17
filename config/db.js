const configdb = require('./index')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        ...configdb
    },
    pool: {min:0, max:10}
});

module.exports = knex;


