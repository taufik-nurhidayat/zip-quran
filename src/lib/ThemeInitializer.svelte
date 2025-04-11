<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'auto') {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.dataset.theme = 'dark';
			} else {
				document.documentElement.dataset.theme = 'light';
			}
		} else if (theme != null) {
			document.documentElement.dataset.theme = theme;
		}
	});
</script>
