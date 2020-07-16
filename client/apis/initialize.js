import { get } from "../controllers/fetcher.js";

function getInitialData() {
  const path = "/init";
  return get(path, []);
}

export default getInitialData;
