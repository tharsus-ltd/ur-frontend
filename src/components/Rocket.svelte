<script>
  import Speedometer from "svelte-speedometer";
  import Slider from "../components/Slider.svelte";
  import Button from "../components/Button.svelte";
  import { create_rocket, launch_rocket, update_rocket } from "../rockets";
  import { onMount } from "svelte";

  let height=20
  let num_engines=1
  let rid = ""
  let altitude=20

  onMount(async () => {
    const rocket = await create_rocket(height, num_engines)
    rid = rocket.id;
  })

  $: {
    if (rid !== "") {
      update_rocket(rid, height, num_engines)
      .then(resp => resp && console.log(resp.data))
    }
  }

  function handleLaunch() {
    launch_rocket(rid, event => {
      console.log(event)
    })
  }
</script>

<div class="p-4 md:w-3/4">
  <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
    <div class="md:flex">
      <div class="flex-grow">
        <div class="md:flex">
          <p class="self-center text-xl w-8">Height:</p> <Slider min_val=20 max_val=200 bind:value={height} />
        </div>
        <div class="md:flex">
          <p class="self-center text-xl w-8">Engines:</p> <Slider min_val=1 max_val=8 bind:value={num_engines} />
        </div>
      </div>

      <div class="w-48 mx-auto">
        <Speedometer
          bind:value={altitude}
          minValue=0
          maxValue=180000
          segments=1
          needleColor="#DB2777"
          startColor="#bfbfbf"
          fluidWidth=true
          needleHeightRatio=0.7
          valueFormat="d"
        />
      </div>
    </div>

    <div class="flex items-center mx-auto pt-4 -mb-4">
      <Button label="Launch" on:click={handleLaunch} />
    </div>
  </div>
</div>

