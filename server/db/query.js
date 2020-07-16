const getInitialData =
  "select column.id colId, card.id cardId,  card.note, card.writer, column.title columnTitle, columnOrder.order from todo.card, todo.column, todo.columnOrder where card.id = columnOrder.card_id and column.id = columnOrder.col_id";
const getAllColumn = `select * from todo.column;`;
const getAllCard = `select * from todo.card;`;
const getAllColumnOrder = "select * from todo.columnOrder";

export { getInitialData, getAllCard, getAllColumn, getAllColumnOrder };
