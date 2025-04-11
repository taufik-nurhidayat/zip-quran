<script lang="ts">
	import TopBar from '$lib/components/TopBar.svelte';
	import { availableThemes, getSystemPreference, setTheme, theme } from '$lib/stores/theme';
</script>

<div>
	<TopBar title="Settings" />
	<div class="space-y-4 pt-16 pb-5">
		<div class="join join-vertical w-full">
			<label class="join-item btn w-full justify-start" for="#">
				<span class="material-symbols-rounded text-xl">language</span>
				<span>Language</span>
			</label>
			<label class="join-item btn w-full justify-start" for="theme_changer">
				<span class="material-symbols-rounded text-xl">palette</span>
				<span>Theme</span>
				<span class="ml-auto text-xs font-normal">{$theme}</span>
			</label>
		</div>
		<div class="join join-vertical w-full">
			<button class="join-item btn w-full justify-start">
				<span class="material-symbols-rounded text-xl">error</span>
				<span> About </span>
			</button>
		</div>
	</div>
	<input type="checkbox" id="theme_changer" class="modal-toggle" />
	<div class="modal modal-bottom sm:modal-middle" role="dialog">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Change theme</h3>
			<div class="flex flex-wrap gap-2 py-8">
				{#each availableThemes as value, index (index)}
					<button class="btn" onclick={() => setTheme(value)}>
						<div
							data-theme={value === 'auto' ? getSystemPreference() : value}
							class="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm"
						>
							<div class="bg-base-content size-1 rounded-full"></div>
							<div class="bg-primary size-1 rounded-full"></div>
							<div class="bg-secondary size-1 rounded-full"></div>
							<div class="bg-accent size-1 rounded-full"></div>
						</div>
						<span class="text-xs uppercase">
							{value}
						</span>
					</button>
				{/each}
			</div>
		</div>
		<label class="modal-backdrop" for="theme_changer">close</label>
	</div>
</div>
