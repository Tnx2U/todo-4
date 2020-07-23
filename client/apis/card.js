import { del, post } from "../controllers/fetcher.js";

const deleteCard = function (colId, cardId, order) {
  const path = `/card/${cardId}`;
  const params = { colId: colId, cardId: cardId, order: order };
  return del(path, params);
};

const addCard = function (writer, note, columnId) {
  const path = "/card";
  const params = { writer: writer, note: note, columnId: columnId };
  return post(path, params);
};

export { deleteCard, addCard };
