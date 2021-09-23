<script>
  import Speedometer from "svelte-speedometer";
  import Slider from "../components/Slider.svelte";
  import Button from "../components/Button.svelte";
  import { create_rocket, launch_rocket, update_rocket, start_websocket } from "../rockets";
  import { onMount } from "svelte";

  export let height = 20
  export let num_engines = 1
  export let rid = ""
  export let altitude = 0
  export let crashed = false
  export let launched = false
  export let status

  $: on_ground = !launched && !crashed

  function liveUpdate(rocket) {
    altitude = rocket.altitude
    crashed = rocket.crashed
    status = rocket.status
  }

  onMount(async () => {
    if (rid === "") {
      const rocket = await create_rocket(height, num_engines)
      rid = rocket.id;
      status = rocket.status
    } else {
      start_websocket(rid, event => liveUpdate(JSON.parse(event.data).rocket))
    }
  })

  $: {
    if (rid !== "") {
      update_rocket(rid, height, num_engines)
      .then(resp => resp && console.log(resp.data))
    }
  }

  async function handleLaunch() {
    await launch_rocket(rid)
    start_websocket(rid, event => liveUpdate(JSON.parse(event.data).rocket))
  }
</script>

<div class="p-4 md:w-3/4">
  <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
    <div class="flex flex-row">
      <div class="text-lg mx-auto">Rocket ID: {rid}</div>
      <div class="text-lg mx-auto">Status: {status}</div>
    </div>

    <div class="md:flex">
      <div class="flex-grow">
        <div class="md:flex">
          <p class="self-center text-xl w-8">Height:</p> <Slider min_val=20 max_val=200 bind:value={height} bind:enabled={on_ground} />
        </div>
        <div class="md:flex">
          <p class="self-center text-xl w-8">Engines:</p> <Slider min_val=1 max_val=8 bind:value={num_engines} bind:enabled={on_ground} />
        </div>
      </div>

      <div class="w-48 mx-auto">
        <Speedometer
          forceRender={true}
          value={altitude}
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
    </div>

    <div class="flex items-center mx-auto pt-4 -mb-4">
      <Button label="Launch" on:click={handleLaunch} />
    </div>
  </div>
</div>

