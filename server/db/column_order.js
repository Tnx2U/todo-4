import excute from "./excute";
import {
  pushOrder,
  switchCard,
  pullOrder,
  // putColumnOrderForDAD,
  postMoveActivity,
} from "./query";

function queryPutColumnOrderForDAD(params) {
  console.log(params);
  excute(postMoveActivity(params)).catch((error) => {
    console.log(error);
  });
  return excute(pushOrder(params)).then(() => {
    return excute(switchCard(params)).then(() => {
      return excute(pullOrder(params));
    });
  });
}

export { queryPutColumnOrderForDAD };
