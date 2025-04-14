<script lang="ts">
	import '../font.css';
	import '../app.css';
	import ThemeInitializer from '$lib/ThemeInitializer.svelte';
</script>

<svelte:head>
	<title>Zip Qur'an - Simple Al-Qur'an Applications</title>
</svelte:head>
<ThemeInitializer />
<div class="Container h-screen px-4">
	<slot />
</div>
