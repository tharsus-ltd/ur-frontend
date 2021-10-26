import { writable } from "svelte/store";
import { push } from "svelte-spa-router";
import axios from "axios";

export const VERSION = "0.1.0";
const URL_BASE = "http://localhost/user-manager";

export const auth = writable(null);

export function logout() {
  auth.update(() => null);
}

export function set_form(user_name, password) {
  const data = new FormData();
  data.append("username", user_name);
  data.append("password", password);
  return data;
}

export async function register(user_name, password) {
  try {
    await axios.post(`${URL_BASE}/register`, set_form(user_name, password), {
      headers: { "Content-Type": "application/form-data" },
    });
    return true;
  } catch (error) {
    alert("registration failed 😥");
    logout();
    return false;
  }
}

export async function get_token(user_name, password) {
  try {
    let resp = await axios.post(
      `${URL_BASE}/token`,
      set_form(user_name, password),
      {
        headers: { "Content-Type": "application/form-data" },
      }
    );
    const token = resp.data.access_token;
    resp = await axios.get(`${URL_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const username = resp.data.username;
    auth.update(() => ({
      username,
      token,
    }));
    return true;
  } catch (error) {
    alert("login failed 😥");
    logout();
    return false;
  }
}
