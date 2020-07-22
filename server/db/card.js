import excute from "./excute";
import {
  postCard,
  pushColumnOrder,
  postColumnOrder,
  putCard,
  deleteCard,
  pullColumnOrder,
} from "./query";

function queryPostCard(params) {
  const pushFromOrder = 1;
  //카드 row 추가
  excute(postCard(params)).then((result) => {
    params.insertId = result.insertId;
    //해당 컬럼의 카드들 한칸씩 내리기
    excute(pushColumnOrder(params.columnId, pushFromOrder)).then(() => {
      //해당 컬럼에 카드 삽입
      return excute(
        postColumnOrder(params.columnId, params.insertId, pushFromOrder)
      );
    });
  });
}

function queryPutCard(params) {
  return excute(putCard(params));
}

function queryDeleteCard(params) {
  return excute(deleteCard(params)).then(() => {
    excute(pullColumnOrder(params.columnId, params.order));
  });
}

export { queryPostCard, queryPutCard, queryDeleteCard };
