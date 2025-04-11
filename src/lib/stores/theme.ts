// theme.js
import { writable } from 'svelte/store';

// Create the theme store with an initial value from localStorage or 'auto'
const storedTheme =
	typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'auto' : 'auto';
export const theme = writable(storedTheme);

// Define available themes for reference
export const availableThemes = ['light', 'dark', 'auto', 'retro'];

// Function to set theme (can be used anywhere)
export function setTheme(newTheme: string) {
	// Validate theme if needed
	if (!availableThemes.includes(newTheme)) {
		console.warn(`Theme "${newTheme}" is not recognized. Using "light" instead.`);
		newTheme = 'light';
	}

	// Save to localStorage for persistence
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('theme', newTheme);
	}

	// Update the store value
	theme.set(newTheme);
}

// Function to get the system preference
export function getSystemPreference() {
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
