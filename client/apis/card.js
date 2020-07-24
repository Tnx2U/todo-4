import { del, post, put } from "../controllers/fetcher.js";

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

const editCard = function (cardId, note) {
  const path = `/card/${cardId}/note`;
  const params = { cardId: cardId, note: note };
  return put(path, params);
};

export { deleteCard, addCard, editCard };
