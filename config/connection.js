// const Sequelize = require('sequelize')
const mysql = require("mysql2");
require('dotenv').config();

// Connect to export
module.exports = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the companyEmployee_db database.`)
  );