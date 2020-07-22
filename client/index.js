import Header from "./components/header/header.js";
import Column from "./components/column/column.js";
import HiddenMenu from "./components/hiddenMenu/hiddenMenu.js";
import Data from "./controllers/data.js";
import DragAndDrop from "./controllers/dragAndDrop.js";

function render() {
  new Header(document.querySelector(".header"));
  Data.getColumnData().forEach((column) => {
    const columnWrapElement = document.querySelector(".column_wrap");
    new Column(columnWrapElement, column.colId);
  });

  new HiddenMenu(document.querySelector(".menu_wrap"), Data.getActivityData());
}

function initialize() {
  //suggest : 기다리는 대상이 없는 async를 쓸 필요가 있나?
  Data.initialize().then(() => {
    render();
    DragAndDrop.initialize();
  });
}
initialize();
