<script>
  import Header from "../components/Header.svelte";
  import Button from "../components/Button.svelte";
  import Rocket from "../components/Rocket.svelte";
  import { onMount } from "svelte";
  import { auth, logout } from "../store";
  import { get_rockets, create_rocket } from "../rockets";

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

  async function add_rocket() {
    const rocket = await create_rocket(30, 1)
    rockets = [...rockets, rocket ];
  }
</script>

<Header />

<div class="container mx-auto">
  <div class="text-lg mx-auto">Hi, <span class="font-semibold text-pink-500 text-lg">{username}</span> welcome to Micro Rockets!</div>
  <div class="flex flex-col mx-auto">
    {#each rockets as rocket (rocket.id)}
      <Rocket
        rocket={rocket}
      />
    {/each}
    <div class="mx-auto flex-shrink">
      <Button on:click={add_rocket} label="Create rocket"/>
    </div>
  </div>
</div>