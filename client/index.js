import getInitialData from "./apis/initialize.js";
import Header from "./components/header/header.js";
import Column from "./components/column/column.js";
import HiddenMenu from "./components/hiddenMenu/hiddenMenu.js";

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

function render(data) {
  new Header(document.querySelector(".header"));
  const columnWrapElement = document.querySelector(".column_wrap");
  data.forEach((column) => {
    columnWrapElement.insertAdjacentHTML(
      "beforeend",
      `<div class="column" id="column${column.colId}"></div>`
    );
    const columnElement = document.querySelector(`#column${column.colId}`);
    new Column(columnElement, column);
  });

  new HiddenMenu(document.querySelector(".menu_wrap"), dummyActData);
}

async function initialize() {
  const value = await getInitialData()
    .then((data) => data.json())
    .then((data) => {
      render(data.data);
    });
}
initialize();
