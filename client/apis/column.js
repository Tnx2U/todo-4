import { put } from "../controllers/fetcher.js";

const editColumnTitle = function (colId, title) {
  const path = `/column/${colId}/title`;
  const params = { columnId: colId, title: title };
  return put(path, params);
};

export { editColumnTitle };
