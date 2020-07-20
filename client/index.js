import Header from "./components/header/header.js";
import Column from "./components/column/column.js";
import HiddenMenu from "./components/hiddenMenu/hiddenMenu.js";
import Data from "./controllers/data.js";

function render() {
  new Header(document.querySelector(".header"));
  const columnWrapElement = document.querySelector(".column_wrap");
  Data.getColumnData().forEach((column) => {
    columnWrapElement.insertAdjacentHTML(
      "beforeend",
      `<div class="column" id="column${column.colId}"></div>`
    );
    const columnElement = document.querySelector(`#column${column.colId}`);
    new Column(columnElement, column.colId);
  });

  new HiddenMenu(document.querySelector(".menu_wrap"), Data.getActivityData());
}

function initialize() {
  Data.initialize().then(() => {
    render();
  });
}

initialize();
