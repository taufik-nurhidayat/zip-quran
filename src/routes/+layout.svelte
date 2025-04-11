<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import '../font.css';
	import '../app.css';
	import '../icon.css';
	import ThemeWatcher from '$lib/ThemeWatcher.svelte';
</script>

<svelte:head>
	<title>Zip Qur'an - Simple Al-Qur'an Applications</title>
</svelte:head>
<ThemeWatcher />
<div class="h-screen">
	<div class="h-full overflow-auto">
		<slot />
	</div>
	<AppBar />
</div>
