import getInitialData from "../apis/initialize.js";
import { updateCardOrder } from "../apis/columnOrder.js";
import { deleteCard, addCard, editCard } from "../apis/card.js";
import { editColumnTitle } from "../apis/column.js";
// activity 더미 데이터
const dummyActData = [
  {
    actionType: "moveColumn",
    userId: "user1",
    actionTime: new Date(2020, 6, 17, 11, 13, 0),
    fromColumnTitle: "해야할 일",
    toColumnTitle: "하는중",
    card_id: "",
    card_note: "",
  },
  {
    actionType: "moveCard",
    userId: "user1",
    actionTime: new Date(2020, 6, 17, 11, 15, 0),
    fromColumnTitle: "해야할 일",
    toColumnTitle: "하는중",
    card_id: "1",
    card_note: "이번주 기획리뷰",
  },
  {
    actionType: "addCard",
    userId: "user1",
    actionTime: new Date(2020, 6, 17, 11, 30, 0),
    fromColumnTitle: "해야할 일",
    toColumnTitle: "",
    card_id: "3",
    card_note: "MVC 패턴 스켈레톤 구현",
  },
  {
    actionType: "updateCard",
    userId: "user1",
    actionTime: new Date(2020, 6, 17, 12, 13, 0),
    fromColumnTitle: "해야할 일",
    toColumnTitle: "",
    card_id: "3",
    card_note: "MVC 패턴 스켈레톤 구현 +++",
  },
];

export default class Data {
  static columnData = null;
  static activityData = null;
  static user = "woowa";

  static async initialize() {
    await getInitialData()
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        this.setColumnData(response.data);
        this.setActivityData(dummyActData);
      });
  }

  static async addCard(note, columnId) {
    const writer = this.user;
    const cardId = await addCard(writer, note, columnId)
      .then((response) => response.json())
      .then((response) => {
        return response.cardId;
      });
    const columnIndex = this.getColumnOrderByColumId(columnId);
    this.columnData[columnIndex].cards.splice(0, 0, {
      cardId: cardId,
      note: note,
      writer: this.user,
    });
    return cardId;
  }
  static async editColumnTitle(colId, title) {
    await editColumnTitle(colId, title)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success);
      });
    const columnIndex = this.getColumnOrderByColumId(colId);
    this.columnData[columnIndex].title = title;
  }
  static async editCard(colId, cardId, note) {
    await editCard(cardId, note)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success);
      });
    const columnIndex = this.getColumnOrderByColumId(colId);
    const cardIndex = this.getOrderInColumnByCardId(colId, cardId);
    this.columnData[columnIndex].cards[cardIndex].note = note;
  }

  static async removeCard(colId, cardId, order) {
    await deleteCard(colId, cardId, order)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success);
      });
    const columnIndex = this.getColumnOrderByColumId(colId);
    this.columnData[columnIndex].cards.splice(order, 1);
  }

  static async updateCardOrder(
    fromColumnId,
    toColumnId,
    orderInFromColumn,
    orderInToColumn,
    cardId
  ) {
    await updateCardOrder(
      fromColumnId,
      toColumnId,
      orderInFromColumn + 1,
      orderInToColumn + 1,
      cardId
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success);
      });
    const fromColumnOrder = this.getColumnOrderByColumId(fromColumnId);
    const toColumnOrder = this.getColumnOrderByColumId(toColumnId);
    const fromCardData = this.columnData[fromColumnOrder].cards.splice(
      orderInFromColumn,
      1
    );
    this.columnData[toColumnOrder].cards.splice(
      orderInToColumn,
      0,
      fromCardData[0]
    );
  }

  static setColumnData(columnData) {
    this.columnData = columnData;
  }

  static setActivityData(activityData) {
    this.activityData = activityData;
  }

  static getCardDataById(colId, cardId) {
    return this.getColumnDataById(colId).cards.filter(
      (card) => card.cardId === cardId
    )[0];
  }

  static getColumnData() {
    return this.columnData;
  }

  static getColumnDataById(colId) {
    return this.columnData.filter((column) => column.colId === colId)[0];
  }

  static getActivityData() {
    return this.activityData;
  }

  static getOrderInColumnByCardId(colId, cardId) {
    return this.getColumnDataById(colId).cards.findIndex(
      (card) => card.cardId === cardId
    );
  }

  static getColumnOrderByColumId(colId) {
    return this.columnData.findIndex((column) => column.colId === colId);
  }
}
