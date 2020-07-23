import excute from "./excute";
import { getInitialData } from "./query";

function queryInitialData() {
  return excute(getInitialData);
}

export { queryInitialData };
