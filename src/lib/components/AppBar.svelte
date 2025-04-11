<script>
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
			link: '/bookmark'
		},
		{
			name: 'Settings',
			icon: 'settings',
			link: '/settings'
		}
	];
</script>

<div class="bg-base-100 fixed bottom-0 left-0 w-full shadow">
	<div class="mx-auto flex w-full max-w-xl justify-between gap-2 p-1">
		{#each navs as nav, index (index)}
			<a
				href={nav.link}
				class="hover:bg-base-200 rounded-field inline-flex grow flex-col items-center justify-center px-4 py-2"
				class:text-primary={nav.link === page.url.pathname}
			>
				<span class="material-symbols-rounded filled">{nav.icon}</span>
				<span class="text-xs font-medium">{nav.name}</span>
			</a>
		{/each}
	</div>
</div>
