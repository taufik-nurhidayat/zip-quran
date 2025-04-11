<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import '../font.css';
	import '../app.css';
	import '../icon.css';
</script>

<div class="h-screen">
	<div class="h-full overflow-auto">
		<slot />
	</div>
	<AppBar />
</div>
