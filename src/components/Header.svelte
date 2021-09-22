<script>
  import { onMount } from 'svelte';
  import { auth, logout } from '../store';
  import { get } from 'svelte/store';
  import { push } from 'svelte-spa-router';

  function handleLogout() {
    logout();
  }
</script>

<header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <div class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      🚀
    </div>
    <div class="md:ml-auto flex flex-wrap items-center text-base justify-center">
    </div>
    <button on:click={handleLogout} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Logout
    </button>
  </div>
</header>