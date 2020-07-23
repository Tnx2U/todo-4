import excute from "./excute";
import { putColumnOrderForDAD, postMoveActivity } from "./query";

function queryPutColumnOrderForDAD(params) {
  excute(postMoveActivity(params)).catch((error) => {
    console.log(error);
  });
  return excute(putColumnOrderForDAD(params));
}

export { queryPutColumnOrderForDAD };
