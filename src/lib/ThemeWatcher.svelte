<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			document.documentElement.dataset.theme = 'dark';
		} else if (theme === 'light') {
			document.documentElement.dataset.theme = 'light';
		} else {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.dataset.theme = 'dark';
			} else {
				document.documentElement.dataset.theme = 'light';
			}
		}
	});
</script>
