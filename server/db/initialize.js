import excute from "./excute";
import {
  getInitialData,
  getAllCard,
  getAllColumn,
  getAllColumnOrder,
} from "./query";

function queryInitialData() {
  return excute(getInitialData);
}

export { queryInitialData };
