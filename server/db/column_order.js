import excute from "./excute";
import { putColumnOrderForDAD } from "./query";

function queryPutColumnOrderForDAD(params) {
  return excute(putColumnOrderForDAD(params));
}

export { queryPutColumnOrderForDAD };
