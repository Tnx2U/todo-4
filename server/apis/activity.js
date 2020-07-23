import { queryPostActivity, queryGetAllActivity } from "../db/activity.js";

async function postActivity(params) {
  const result = await queryPostActivity(params);
}

async function getAllActivity() {
  const result = await queryGetAllActivity();
  return result;
}

export { postActivity, getAllActivity };
