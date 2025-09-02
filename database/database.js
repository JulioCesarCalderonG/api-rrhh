require("dotenv").config();

const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
    port:process.env.DB_PORT,
    timezone: '-05:00',
  }
);

module.exports = sequelize;
