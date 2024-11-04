import { BASE_URL } from "../data/constants.js";

export async function sendData(endpoint, method, body = {}) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${method} ${endpoint}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}
