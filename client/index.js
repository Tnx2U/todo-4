import Header from "./components/header/header.js";
import Column from "./components/column/column.js";
import HiddenMenu from "./components/hiddenMenu/hiddenMenu.js";
import Data from "./controllers/data.js";
import DragAndDrop from "./controllers/dragAndDrop.js";
import ModalRander from "./controllers/modalRander.js";

function render() {
  new Header(document.querySelector(".header"));
  Data.getColumnData().forEach((column) => {
    const columnWrapElement = document.querySelector(".column_wrap");
    new Column(columnWrapElement, column.colId);
  });

  new HiddenMenu(document.querySelector(".menu_wrap"), Data.getActivityData());
  ModalRander.renderDeleteCardModal(1, 1, 1);
}

function initialize() {
  Data.initialize().then(() => {
    render();
    DragAndDrop.initialize();
  });
}

initialize();
