import excute from "./excute";
import { putColumn } from "./query";

function queryPutColumn(params) {
  return excute(putColumn(params));
}

export { queryPutColumn };
