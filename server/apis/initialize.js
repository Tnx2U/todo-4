import { queryInitialData } from "../db/initialize";

async function getInitialData() {
  const result = await queryInitialData();
}

export { getInitialData };
