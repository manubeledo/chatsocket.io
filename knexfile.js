// Update with your config settings.
const configdb = require('./index')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './ecommerce/mensajes.sqlite'
    }
  },
  development_two: {
    client: 'mysql',
    connection: {
      ...configdb
    }
  },
  useNullAsDefault: true
};
