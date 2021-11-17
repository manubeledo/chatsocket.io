require("dotenv").config();

let configdb = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    table: process.env.T_NAME
}

module.exports = configdb

