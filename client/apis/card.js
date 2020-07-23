import { del } from "../controllers/fetcher.js";

const deleteCard = function (colId, cardId, order) {
  const path = `/card/${cardId}`;
  const params = { colId: colId, cardId: cardId, order: order };
  return del(path, params);
};

export { deleteCard };
