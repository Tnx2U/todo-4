import getInitialData from "./apis/initialize.js";
import Header from "./components/header/header.js";
import Column from "./components/column/column.js";

function render(data) {
  new Header(document.querySelector(".header"));
  for (let index = 0; index < data.length; index++) {
    // console.log("column id : ", data[index]);
    new Column(document.querySelector(".column_wrap"), data[index]);
  }
}

async function initialize() {
  const value = await getInitialData()
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      render(data.data);
    });
}
initialize();
