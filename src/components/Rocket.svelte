<script>
  import Speedometer from "svelte-speedometer";
  import Slider from "../components/Slider.svelte";
  import Button from "../components/Button.svelte";
  import { launch_rocket, update_rocket, start_websocket } from "../rockets";
  import { onMount } from "svelte";

  export let rocket = {
    num_engines: 0,
    height: 0,
    id: "",
    fuel: 0.0,
    altitude: 0.0,
    velocity: 0.0,
    crashed: false,
    launched: false,
    max_altitude: 0.0,
    status: ""
  }

  $: on_ground = !rocket.launched && !rocket.crashed
  
  $: {
    if (on_ground) {
      update_rocket(rocket.id, rocket.height, rocket.num_engines)
    }
  }

  onMount(async () => {
    if (rocket.launched) {
      start_websocket(rocket.id, event => rocket = JSON.parse(event.data).rocket)
    }
  })

  async function handleLaunch() {
    await launch_rocket(rocket.id)
    start_websocket(rocket.id, event => rocket = JSON.parse(event.data).rocket)
  }
</script>

<div class="p-4 md:w-3/4">
  <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
    <div class="flex flex-row">
      <div class="text-lg mx-auto">Rocket ID: {rocket.id}</div>
      <div class="text-lg mx-auto">Status: {rocket.status}</div>
    </div>

    <div class="md:flex">
      <div class="flex-grow">
        <div class="md:flex">
          <p class="self-center text-xl w-8">Height(m):</p> <Slider min_val=20 max_val=200 bind:value={rocket.height} bind:enabled={on_ground} />
        </div>
        <div class="md:flex">
          <p class="self-center text-xl w-8">Engines:</p> <Slider min_val=1 max_val=8 bind:value={rocket.num_engines} bind:enabled={on_ground} />
        </div>
      </div>

      <div class="w-48 mx-auto">
        <Speedometer
          forceRender={true}
          value={rocket.altitude}
          minValue=-1
          maxValue=180000
          segments=1
          needleColor="#DB2777"
          startColor="#bfbfbf"
          fluidWidth=true
          needleHeightRatio=0.7
          valueFormat="d"
          needleTransitionDuration=0
        />
      </div>
      <div>Altitude (m)</div>
    </div>

    <div class="flex items-center mx-auto pt-4 -mb-4">
      <Button label="Launch" on:click={handleLaunch} />
    </div>
  </div>
</div>

