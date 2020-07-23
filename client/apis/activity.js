import { del } from "../controllers/fetcher.js";

const getAllActivity = function () {
  const path = `/activity/`;
  return del(path, params);
};

export { getAllActivity };
