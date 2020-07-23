import { get } from "../controllers/fetcher.js";

function getAllActivity() {
  const path = "/activity";
  return get(path, []);
}

export default getAllActivity;
