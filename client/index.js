import getInitialData from "./apis/initialize.js";

async function initialyze() {
  const value = await getInitialData()
    .then((data) => data.json())
    .then((data) => console.log(data));
}

initialyze();
