import axios from "axios";
import { get } from "svelte/store";
import { auth } from "./store";

const HOST = "localhost/rocket-manager/";

export async function create_rocket(height, num_engines) {
  const token = get(auth).token;
  try {
    return (
      await axios.post(
        `http://${HOST}/rockets`,
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
      `http://${HOST}/rockets/${id}`,
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

export async function get_rockets() {
  const token = get(auth).token;
  try {
    const resp = await axios.get(`http://${HOST}/rockets`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

export function start_websocket(id, callback) {
  var ws = new WebSocket(`ws://${HOST}/rocket/${id}/ws`);
  ws.onmessage = callback;
}

export async function launch_rocket(id) {
  const token = get(auth).token;
  try {
    // Send launch command
    await axios.put(
      `http://${HOST}/rockets/${id}/launch`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
