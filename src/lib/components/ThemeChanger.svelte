<script>
	import { getSystemPreference, setTheme, availableThemes } from '$lib/stores/theme';
</script>

<input type="checkbox" id="theme_changer" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle" role="dialog">
	<div class="modal-box">
		<label for="theme_changer" class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
			>✕</label
		>
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
