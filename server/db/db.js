const mysql = require("mysql");

exports.dbtest = function () {
  const DBconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  DBconnection.connect();
  DBconnection.query(
    // `select column.id colId, card.id cardId,  card.note, card.writer, column.title columnTitle, columnOrder.order
    //     from todo.card card, todo.column column, todo.columnOrder columnOrder
    //     where card.id = columnOrder.card_id and column.id = columnOrder.col_id`,
    `select column.id colId, card.id cardId,  card.note, card.writer, column.title columnTitle, columnOrder.order
    from todo.card, todo.column, todo.columnOrder
    where card.id = columnOrder.card_id and column.id = columnOrder.col_id`,
    (error, rows, fields) => {
      if (error) throw error;
      console.log("쿼리 결과 : ", rows);
    }
  );
  DBconnection.end();
};

// select `column`.id colId, card.id cardId,  card.note, card.writer, `column`.title columnTitle, columnOrder.order
// from todo.card card, todo.`column` `column`, todo.columnOrder columnOrder
// where card.id = columnOrder.card_id and `column`.id = columnOrder.col_id;
