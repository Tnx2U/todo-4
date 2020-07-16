const getInitialData =
  "select column.id colId, card.id cardId,  card.note, card.writer, column.title columnTitle, columnOrder.order from todo.card, todo.column, todo.columnOrder where card.id = columnOrder.card_id and column.id = columnOrder.col_id";

export { getInitialData };
