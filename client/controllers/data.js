import getInitialData from "../apis/initialize.js";

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

  static async initialize() {
    await getInitialData()
      .then((response) => response.json())
      .then((response) => {
        this.setColumnData(response.data);
        this.setActivityData(dummyActData);
      });
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
}
