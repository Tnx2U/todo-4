import { queryPutColumn } from "../db/column.js";

async function putColumn(params) {
  const result = await queryPutColumn(params);
}

export { putColumn };
