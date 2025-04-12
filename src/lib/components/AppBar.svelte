<script lang="ts">
	import { page } from '$app/state';

	const navs = [
		{
			name: 'Home',
			icon: 'home',
			link: '/'
		},
		{
			name: 'Bookmark',
			icon: 'bookmark',
			link: '/bookmarks'
		},
		{
			name: 'Settings',
			icon: 'settings',
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
			<a href={nav.link} class="grow" class:active={isActive(nav.link)}>
				<span class="material-symbols-rounded filled">{nav.icon}</span>
				<span class="text-xs font-medium">{nav.name}</span>
			</a>
		{/each}
	</nav>
</div>
