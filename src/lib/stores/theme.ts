// theme.js
import { writable } from 'svelte/store';

// Create a theme store with initial value from localStorage or 'auto'
const storedTheme =
	typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'auto' : 'auto';
export const theme = writable(storedTheme);

// Subscribe to theme changes and update localStorage and data-theme attribute
if (typeof window !== 'undefined') {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);

		// Set the data-theme attribute based on the selected theme or system preference
		if (value === 'auto') {
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
		} else {
			document.documentElement.setAttribute('data-theme', value);
		}
	});

	// Listen for system preference changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		// Only update if current theme is 'auto'
		if (localStorage.getItem('theme') === 'auto') {
			document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
		}
	});

	// Initialize theme immediately
	const currentTheme = localStorage.getItem('theme') || 'auto';
	if (currentTheme === 'auto') {
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
	} else {
		document.documentElement.setAttribute('data-theme', currentTheme);
	}
}
