<script>
  import Header from "../components/Header.svelte";
  import Button from "../components/Button.svelte";
  import Rocket from "../components/Rocket.svelte";
  import { auth, logout } from "../store";
  import { create_rocket } from "../rockets";

  let username;

  auth.subscribe(vals => {
    if (vals) {
      username = vals.username;
    } else {
      logout();
    }
  })

  function add_rocket() {
  }
</script>

<Header />

<div>
  <p>Hi, {username} welcome to Micro Rockets!</p>
  <Button on:click={add_rocket} label="Create rocket"/>
  <Rocket />
</div>