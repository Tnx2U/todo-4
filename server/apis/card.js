import { queryPostCard, queryPutCard, queryDeleteCard } from "../db/card.js";

async function postCard(params) {
  const result = await queryPostCard(params);
}

async function putCard(params) {
  const result = await queryPutCard(params);
}

async function deleteCard(params) {
  const result = await queryDeleteCard(params);
}

export { postCard, putCard, deleteCard };
