<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import Book from '$lib/icons/Book.svelte';
	import BookMark from '$lib/icons/BookMark.svelte';
	import Home from '$lib/icons/Home.svelte';
	import Setting from '$lib/icons/Setting.svelte';
	import { type Component } from 'svelte';

	type NavItem = {
		name: string;
		icon: unknown;
		link: string;
	};

	const navs: NavItem[] = [
		{
			name: m.home(),
			icon: Home,
			link: '/'
		},
		{
			name: "Qur'an",
			icon: Book,
			link: '/quran'
		},
		{
			name: m.bookmark(),
			icon: BookMark,
			link: '/bookmarks'
		},
		{
			name: m.settings(),
			icon: Setting,
			link: '/settings'
		}
	];

	function isActive(link: string): boolean {
		return link === page.url.pathname;
	}
</script>

<div class="AppBar">
	<nav class="Container flex w-full justify-between gap-1 p-1">
		{#each navs as nav, index (index)}
			<a href={nav.link} class="flex-1" class:active={isActive(nav.link)}>
				<svelte:component this={nav.icon as Component} size={24} />
				<span class="text-xs font-medium">{nav.name}</span>
			</a>
		{/each}
	</nav>
</div>
