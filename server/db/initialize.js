import excute from "./excute";
import { getAllCard, getAllColumn } from "./query";

function queryInitialData() {
  return excute(getAllCard + getAllColumn);
}

export { queryInitialData };
