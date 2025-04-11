<script lang="ts">
	import { onMount } from 'svelte';

	let canGoback = false;

	onMount(() => {
		canGoback = window.history.length > 1;
	});
	function handleBackClick() {
		if (canGoback) {
			window.history.back();
		} else {
			window.location.replace('/');
		}
	}

	let { title } = $props();
</script>

<div class="fixed top-0 left-0 w-full shadow">
	<div class="bg-base-100 mx-auto flex max-w-xl items-center gap-4 px-4 py-1">
		<div class="flex-1">
			<div class="tooltip tooltip-bottom" data-tip="Back">
				<button class="btn btn-ghost btn-square" aria-label="Back" onclick={handleBackClick}>
					<span class="material-symbols-rounded">arrow_back</span>
				</button>
			</div>
		</div>
		<div class="flex-none text-lg font-semibold">{title}</div>
		<div class="flex-1"></div>
	</div>
</div>
