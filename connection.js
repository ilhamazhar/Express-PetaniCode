const { Client } = require("pg");

const client = new Client({
  host: "192.168.132.4",
  database: "db_azhar",
  user: "admin",
  password: "admin",
  port: 5432,
});

module.exports = client;
