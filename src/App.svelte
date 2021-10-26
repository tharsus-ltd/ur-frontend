<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import Router from 'svelte-spa-router';
	import Login from './routes/Login.svelte';
	import Dash from './routes/Dash.svelte';
	import Footer from './components/Footer.svelte';
</script>

<Tailwindcss />

<div class="flex flex-col h-screen justify-between">
	<Router routes={{
		'/': Login,
		'/dash': Dash
	}} />
	<Footer />
</div>
