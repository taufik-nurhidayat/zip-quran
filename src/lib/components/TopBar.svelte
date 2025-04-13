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
					<svg
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
					>
						<path
							d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
							stroke="#292D32"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						></path>
						<path
							d="M20.5 12H3.67004"
							stroke="#292D32"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						></path>
					</svg>
				</button>
			</div>
		</div>
		<div class="flex-none text-lg font-semibold">{title}</div>
		<div class="flex-1"></div>
	</div>
</div>
