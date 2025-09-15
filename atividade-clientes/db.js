require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sua_nova_senha",
  database: "atividadesRafael",
});

module.exports = pool;
