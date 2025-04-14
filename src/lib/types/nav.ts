import type { Component } from 'svelte';

export type NavItem = {
	name: string;
	icon: Component;
	link: string;
};
