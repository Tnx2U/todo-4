import excute from "./excute";
import {
  postCard,
  pushColumnOrder,
  postColumnOrder,
  putCard,
  deleteCard,
  pullColumnOrder,
  postDeleteActivity,
  postAddActivity,
  postUpdateActivity,
} from "./query";

function queryPostCard(params) {
  excute(postAddActivity(params))
  .catch((error) => {
    console.log(error);
  })
  const pushFromOrder = 1;
  //카드 row 추가
  return excute(postCard(params)).then((result) => {
    params.insertId = result.insertId;
    //해당 컬럼의 카드들 한칸씩 내리기
    return excute(pushColumnOrder(params.columnId, pushFromOrder)).then(() => {
      //해당 컬럼에 카드 삽입
      return excute(
        postColumnOrder(params.columnId, params.insertId, pushFromOrder)
      ).then(() => {
        return { cardId: params.insertId };
      });
    });
}

function queryPutCard(params) {
  excute(postUpdateActivity(params)).catch((error) => {
    console.log(error);
  });
  return excute(putCard(params));
}

function queryDeleteCard(params) {
  excute(postDeleteActivity(params))
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      return excute(deleteCard(params)).then(() => {
        excute(pullColumnOrder(params.columnId, params.order));
      });
    });
}

export { queryPostCard, queryPutCard, queryDeleteCard };
