import mysql from "mysql";

let db = null;

function initPool() {
  if (!db) {
    db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
    });
  }
}

function query(query) {
  initPool();
  const pool = db;
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(query, function (error, results) {
        connection.release();
        if (error) throw error;
        resolve(results);
      });
    });
  });
}

export default query;
