import axios from "axios";
import { get } from "svelte/store";
import { auth } from "./store";

export async function create_rocket(height, num_engines) {
  const token = get(auth).token;
  try {
    return (
      await axios.post(
        "http://localhost:8002/rockets",
        {
          num_engines,
          height,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    ).data;
  } catch (error) {
    console.log(error);
  }
}

export async function update_rocket(id, height, num_engines) {
  const token = get(auth).token;
  try {
    await axios.put(
      `http://localhost:8002/rockets/${id}`,
      {
        num_engines,
        height,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
