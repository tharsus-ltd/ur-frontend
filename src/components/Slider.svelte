<script>
  import { pannable } from './pannable.js';
  export let min_val
  export let max_val
  export let value
  export let enabled = true
  let pointer = "cursor-pointer"
  let perc = getPerc()

  function getPerc() {
    return Math.round(((Number(value) - Number(min_val)) / (Number(max_val) - Number(min_val))) * 100);
  }

  $:  pointer = enabled ? "cursor-pointer" : "";

	function handlePanMove(event) {
    if (enabled) {
      perc += event.detail.dx*0.45
      perc = perc > 100 ? 100 : perc
      perc = perc < 0 ? 0 : perc
      value = Math.round(Number(min_val) + (Number(max_val) - Number(min_val)) * (perc/100))
    }
	}
</script>

<div class="flex w-64 mx-auto items-center h-20 justify-center">
  <div class="py-1 relative min-w-full">
    <div class="h-2 bg-gray-200 rounded-full">
      <div class="absolute h-2 rounded-full bg-teal-600 w-0" style="width: 58%;"></div>
      <div
        class="absolute h-4 flex items-center justify-center w-4 rounded-full bg-red-700 shadow border border-gray-300 -ml-2 top-0 {pointer}"
        use:pannable
        on:panmove={handlePanMove}
        style="left: {perc}%;"
      >
        <div class="relative -mt-2 w-1">
          <div class="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full" style="margin-left: -20.5px;">
            <div class="relative shadow-md">
              <div class="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">{value}</div>
              <svg class="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
                  <polygon class="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute text-gray-800 -ml-1 bottom-0 left-0 -mb-6">{min_val}</div>
      <div class="absolute text-gray-800 -mr-1 bottom-0 right-0 -mb-6">{max_val}</div>
    </div>
  </div>
</div>