<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import Router from 'svelte-spa-router';
	import Login from './routes/Login.svelte';
	import Dash from './routes/Dash.svelte';
</script>

<Tailwindcss />

<Router routes={{
	'/': Login,
	'/dash': Dash
}} />