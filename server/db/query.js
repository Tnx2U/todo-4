const getInitialData = `select column.id colId, column.title columnTitle, columnOrder.order, card.id cardId,  card.note, card.writer
  from todo.card, todo.column, todo.columnOrder 
  where card.id = columnOrder.card_id and column.id = columnOrder.col_id
  order by column.id, columnOrder.order
  `;
const getAllColumn = `select * from todo.column;`;
const getAllCard = `select * from todo.card;`;
const getAllColumnOrder = "select * from todo.columnOrder";

export { getInitialData, getAllCard, getAllColumn, getAllColumnOrder };
