import { post } from "../controllers/fetcher.js";

function updateCardOrder(
  fromColumnId,
  toColumnId,
  orderInFromColumn,
  orderInToColumn,
  cardId
) {
  const path = "/column_order/drag_and_drop";
  return post(path, {
    fromColumnId,
    toColumnId,
    orderInFromColumn,
    orderInToColumn,
    cardId,
  });
}

export { updateCardOrder };
