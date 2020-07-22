import mysql from "mysql2";

const getInitialData = `select column.id colId, column.title columnTitle, columnOrder.order, card.id cardId,  card.note, card.writer
  from todo.card, todo.column, todo.columnOrder 
  where card.id = columnOrder.card_id and column.id = columnOrder.col_id
  order by column.id, columnOrder.order
  `;
const getAllColumn = `select * from todo.column;`;
const getAllCard = `select * from todo.card;`;
const getAllColumnOrder = "select * from todo.columnOrder";
const putColumnOrderForDAD = function (params) {
  let pushOrderQuery = `
  update todo.columnOrder
  set columnOrder.order = columnOrder.order + 1
  where col_id = ? and columnOrder.order >= ?;
  `;
  let switchCardQuery = `
  update todo.columnOrder
  set columnOrder.order = ?, col_id = ?
  where card_id = ?;
  `;
  let pullOrderQuery = `
  update todo.columnOrder
  set columnOrder.order = columnOrder.order - 1
  where col_id = ? and columnOrder.order > ?;
  `;
  const pushOrderQueryC = mysql.format(pushOrderQuery, [
    params.toColumnId,
    params.orderInToColumn,
  ]);
  const switchCardQueryC = mysql.format(switchCardQuery, [
    params.orderInToColumn,
    params.toColumnId,
    params.cardId,
  ]);
  const pullOrderQueryC = mysql.format(pullOrderQuery, [
    params.fromColumnId,
    params.orderInFromColumn,
  ]);

  return pushOrderQueryC + switchCardQueryC + pullOrderQueryC;
};

const postCard = function (params) {
  let insertCardQuery = `
  insert into todo.card (note, writer ,activation)
  values (?, ?, ?);
  `;

  const insertCardQueryC = mysql.format(insertCardQuery, [
    params.note,
    params.writer,
    1,
  ]);
  return insertCardQueryC;
};

const pushColumnOrder = function (columnId, order) {
  let pushOrderQuery = `
  update todo.columnOrder
  set columnOrder.order = columnOrder.order + 1
  where col_id = ? and columnOrder.order >= ?;
  `;
  const pushOrderQueryC = mysql.format(pushOrderQuery, [columnId, order]);
  return pushOrderQueryC;
};

const postColumnOrder = function (columnId, cardId, order) {
  let insertColumnOrderQuery = `
  insert into todo.columnOrder (columnOrder.order, col_id, card_id)
  values (?, ?, ?);
  `;
  const insertColumnOrderQueryC = mysql.format(insertColumnOrderQuery, [
    order,
    columnId,
    cardId,
  ]);
  return insertColumnOrderQueryC;
};

export {
  getInitialData,
  getAllCard,
  getAllColumn,
  getAllColumnOrder,
  putColumnOrderForDAD,
  postCard,
  pushColumnOrder,
  postColumnOrder,
};
