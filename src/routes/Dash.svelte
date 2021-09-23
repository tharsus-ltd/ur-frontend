<script>
  import Header from "../components/Header.svelte";
  import Button from "../components/Button.svelte";
  import Rocket from "../components/Rocket.svelte";
  import { onMount } from "svelte";
  import { auth, logout } from "../store";
  import { get_rockets } from "../rockets";

  let username;
  let rockets = [];

  auth.subscribe(vals => {
    if (vals) {
      username = vals.username;
    } else {
      logout();
    }
  })

  onMount(async () => {
    rockets = await get_rockets()
  })

  function add_rocket() {
    rockets = [...rockets, { rid:"", num_engines:1, height:30, altitude: 0, crashed: false } ];
  }
</script>

<Header />

<div class="container mx-auto">
  <div class="text-lg mx-auto">Hi, <span class="font-semibold text-pink-500 text-lg">{username}</span> welcome to Micro Rockets!</div>
  <div class="flex flex-col mx-auto">
    {#each rockets as rocket (rocket.id)}
      <Rocket
        rid={rocket.id}
        num_engines={rocket.num_engines}
        height={rocket.height}
        altitude={rocket.altitude}
      />
    {/each}
    <div class="mx-auto flex-shrink">
      <Button on:click={add_rocket} label="Create rocket"/>
    </div>
  </div>
</div>