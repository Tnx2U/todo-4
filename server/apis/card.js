import { queryPostCard } from "../db/card.js";

async function postCard(params) {
  const result = await queryPostCard(params);
}

export { postCard };
