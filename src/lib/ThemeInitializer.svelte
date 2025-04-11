<script lang="ts">
	import { onMount } from 'svelte';
	import { theme, getSystemPreference } from '$lib/stores/theme';

	onMount(() => {
		// Set up your own theme initialization logic
		const initializeTheme = () => {
			// Get current theme from the store
			const currentTheme = $theme;

			// Apply theme to document based on your logic
			if (currentTheme === 'auto') {
				const systemTheme = getSystemPreference();
				document.documentElement.setAttribute('data-theme', systemTheme);
			} else {
				document.documentElement.setAttribute('data-theme', currentTheme);
			}
		};

		// Initial setup
		initializeTheme();

		// Subscribe to theme changes
		const unsubscribe = theme.subscribe((value) => {
			if (value === 'auto') {
				const systemTheme = getSystemPreference();
				document.documentElement.setAttribute('data-theme', systemTheme);
			} else {
				document.documentElement.setAttribute('data-theme', value);
			}
		});

		// Set up listener for system preference changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemChange = (e: MediaQueryListEvent) => {
			if ($theme === 'auto') {
				document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handleSystemChange);

		// Cleanup function
		return () => {
			unsubscribe();
			mediaQuery.removeEventListener('change', handleSystemChange);
		};
	});
</script>
