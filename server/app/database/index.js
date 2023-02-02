const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

let pool;
dotenv.config();

async function getConnection() {
  if (!pool) {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
    });
  }
  return pool.getConnection();
}

const convertToMySQLFormat = (obj) => {
  let mysqlString = "";
  for (const key in obj) {
    mysqlString += `${key} = '${obj[key]}', `;
  }
  return mysqlString.slice(0, -2);
};

const covertArrayToColumn = (obj) => {
  obj.join(", ");
};

module.exports = {
  updateData: async (table, data, conditions) => {
    const connection = await getConnection();
    try {
      let query = `UPDATE ${table} SET ${convertToMySQLFormat(
        data
      )} WHERE ${convertToMySQLFormat(conditions)}`;
      const [result] = await connection.query(query, [data, conditions]);
      return result;
    } finally {
      connection.release();
    }
  },
  queryData: async (table, column = {}, conditions) => {
    const connection = await getConnection();
    try {
      let query = column
        ? `SELECT ${covertArrayToColumn(
            column
          )} FROM ${table} WHERE ${convertToMySQLFormat(conditions)}`
        : `SELECT * FROM ${table} WHERE ${convertToMySQLFormat(conditions)}`;
      const [rows, fields] = await connection.query(query, conditions);
      return rows;
    } finally {
      connection.release();
    }
  },
  queryJoin: async (
    table1,
    table2,
    column = {},
    joinConditions,
    conditions
  ) => {
    const connection = await getConnection();
    try {
      let query = column
        ? `SELECT ${covertArrayToColumn(
            column
          )} FROM ${table1} INNER JOIN ${table2} ON ${convertToMySQLFormat(
            joinConditions
          )} WHERE ${convertToMySQLFormat(conditions)}`
        : `SELECT * FROM ${table1} INNER JOIN ${table2} ON ${convertToMySQLFormat(
            joinConditions
          )} WHERE ${convertToMySQLFormat(conditions)}`;
      const [rows, fields] = await connection.query(query, conditions);
      return rows;
    } finally {
      connection.release();
    }
  },
  deleteData: async (table, conditions) => {
    const connection = await getConnection();
    try {
      let query = `DELETE FROM ${table} WHERE ${convertToMySQLFormat(
        conditions
      )}`;
      const [result] = await connection.query(query, conditions);
      return result;
    } finally {
      connection.release();
    }
  },
};
