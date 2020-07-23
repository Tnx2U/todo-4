import { queryInitialData } from "../db/initialize";

async function getInitialData() {
  const result = await queryInitialData();
  let initialData = [];
  let colId = 1;
  let cards = [];
  for (let index = 0; index < result.length; index++) {
    if (index == result.length - 1) {
      //마지막 원소
      if (result[index].colId !== colId) {
        initialData.push({
          colId: result[index - 1].colId,
          title: result[index - 1].columnTitle,
          cards: cards,
        });
        initialData.push({
          colId: result[index].colId,
          title: result[index].columnTitle,
          cards: [
            {
              cardId: result[index].cardId,
              note: result[index].note,
              writer: result[index].writer,
            },
          ],
        });
      } else {
        cards.push({
          cardId: result[index].cardId,
          note: result[index].note,
          writer: result[index].writer,
        });
        initialData.push({
          colId: result[index].colId,
          title: result[index].columnTitle,
          cards: cards,
        });
      }
      break;
    }
    if (result[index].colId !== colId) {
      //컬럼 push
      initialData.push({
        colId: result[index - 1].colId,
        title: result[index - 1].columnTitle,
        cards: cards,
      });
      cards = [];
      colId = result[index].colId;
    }
    //컬럼에 카드 push
    cards.push({
      cardId: result[index].cardId,
      note: result[index].note,
      writer: result[index].writer,
    });
  }
  return initialData;
}

export { getInitialData };
