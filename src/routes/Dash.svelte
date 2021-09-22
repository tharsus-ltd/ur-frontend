<script>
  import Header from "../components/Header.svelte";
  import { auth, logout } from "../store";

  let username;

  auth.subscribe(vals => {
    if (vals) {
      username = vals.username;
    } else {
      logout();
    }
  })
</script>

<Header />

<div>
  <p>Hi, {username} welcome to Micro Rockets!</p>
</div>