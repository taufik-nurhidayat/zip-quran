import type { Mode } from './types/mode';

export function themeSwitch(mode: Mode) {
	if (mode === 'dark') {
		window.localStorage.setItem('theme', 'dark');
		document.documentElement.dataset.theme = 'dark';
	} else if (mode === 'light') {
		window.localStorage.setItem('theme', 'light');
		document.documentElement.dataset.theme = 'light';
	} else {
		window.localStorage.removeItem('theme');
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.dataset.theme = 'dark';
		} else {
			document.documentElement.dataset.theme = 'light';
		}
	}
}
