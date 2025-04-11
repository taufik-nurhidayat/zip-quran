<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import '../app.css';
</script>

<div class="h-screen">
	<div class="h-full overflow-auto">
		<slot />
	</div>
	<AppBar />
</div>
