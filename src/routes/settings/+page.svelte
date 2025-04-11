<script lang="ts">
	import { onDestroy } from 'svelte';
	import { theme } from '$lib/stores/theme';

	const themes = ['light', 'dark', 'retro', 'auto'];
</script>

<div>
	<div>
		<select class="select" placeholder="Theme" bind:value={$theme}>
			{#each themes as tName, index (index)}
				<option>{tName}</option>
			{/each}
		</select>
	</div>
</div>
