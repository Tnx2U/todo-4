import excute from "./excute";
import { getAllActivity, postActivity } from "./query.js";

function queryPostActivity(params) {
  return excute(postActivity(params));
}

function queryGetAllActivity() {
  return excute(getAllActivity);
}

export { queryPostActivity, queryGetAllActivity };
