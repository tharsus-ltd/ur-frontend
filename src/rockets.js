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

export async function launch_rocket(id, callback) {
  const token = get(auth).token;
  try {
    // Send launch command
    await axios.put(
      `http://localhost:8002/rockets/${id}/launch`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // create websocket
    var ws = new WebSocket(`ws://localhost:8002/rocket/${id}/ws`);
    ws.onmessage = callback;
  } catch (error) {
    console.log(error);
  }
}
