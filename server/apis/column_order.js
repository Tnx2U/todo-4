import { queryPutColumnOrderForDAD } from "../db/column_order.js";

async function putColumnOrder(params) {
  const result = await queryPutColumnOrderForDAD(params);
}

export { putColumnOrder };
