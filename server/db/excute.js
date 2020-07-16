import mysql from "mysql";

let db = null;

function initPool() {
  if (!db) {
    db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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

function getInitialData() {
  return query(
    `select column.id colId, card.id cardId,  card.note, card.writer, column.title columnTitle, columnOrder.order
  from todo.card, todo.column, todo.columnOrder
  where card.id = columnOrder.card_id and column.id = columnOrder.col_id`
  );
}

export default getInitialData;
