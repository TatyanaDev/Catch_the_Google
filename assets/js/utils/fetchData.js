import { BASE_URL } from "../data/constants.js";

export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error);
  }
}
