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
    let value = (typeof obj[key]) === 'string' ? `'${obj[key]}'`:obj[key];
    mysqlString += '`'+`${key}`+'`'+` = ${value}, `;
  }
  return mysqlString.slice(0, -2);
};

const convertArrayToColumn = (obj) => {
  return obj.map(e => '`'+e+'`').join(", ");
};

const insertDataFormat = (arr) => {
  return "(" + arr.map((element) => {
    return typeof element === 'string' ? `'${element}'` : element;
  }).join(", ") + ")";
};


module.exports = {
  updateData: async (table = '', data = {}, conditions = []) => {
    const connection = await getConnection();
    try {
      let query = `UPDATE ${table} SET ${convertToMySQLFormat(
        data
      )} WHERE ${conditions.join(' AND ')}`;
      const [rows] = await connection.execute(query);
      console.log(query);
      return rows.affectedRows ? {status:'success'}:{status:'failed'};
    } finally {
      connection.release();
    }
  },
  insertData: async (table = '', data = {}) => {
    const connection = await getConnection();
    try {

      let key = Object.keys(data);
      let value = Object.values(data);

      let query = `INSERT INTO ${table} (${key.map(e => '`'+e+'`').join(', ')}) VALUES ${insertDataFormat(value)}`;
      console.log(`INSERT : ${query}`);
      const [rows] = await connection.execute(query);
      console.log(rows.insertId);
      return (rows.insertId) ? {status:'success',insert_id:rows.insertId}:{status:'failed'}; 
    } finally {
      connection.release();
    }
  },
  queryData: async (table = '', column = [], conditions = []) => {
    const connection = await getConnection();
    try {
      let query = column
        ? `SELECT ${convertArrayToColumn(
            column
          )} FROM ${table} WHERE ${conditions.join(' AND ')}`
        : `SELECT * FROM ${table} WHERE ${conditions.join(' AND ')}`;
      const [rows] = await connection.query(query);
      console.log(`QUERY : ${query}`);
      return rows;
    } finally {
      connection.release();
    }
  },
  queryJoin: async (
    table = [],
    column = [],
    joinConditions = [],
    conditions = []
  ) => {
    const connection = await getConnection();
    try {
      let query = column
        ? `SELECT ${convertArrayToColumn(
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
  deleteData: async (table = '', conditions = []) => {
    const connection = await getConnection();
    try {
      let query = `DELETE FROM ${table} WHERE ${conditions.join(' AND ')}`;
      console.log(query);
      const [result] = await connection.execute(query);
      return result.affectedRows ? {status:'success'}:{status:'failed'};
    } finally {
      connection.release();
    }
  },
};
