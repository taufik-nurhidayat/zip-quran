<script lang="ts">
	import ArrowLeftTwoTone from '$lib/icons/ArrowLeftTwoTone.svelte';
	import MoreTwoTone from '$lib/icons/MoreTwoTone.svelte';

	function handleBackClick() {
		window.history.back();
	}

	let { title } = $props();
</script>

<div class="fixed top-0 left-0 w-full shadow">
	<div class="bg-base-100 mx-auto flex max-w-xl items-center gap-4 px-4 py-1">
		<div class="flex-1">
			<div class="tooltip tooltip-bottom" data-tip="Back">
				<button class="btn btn-ghost btn-square" aria-label="Back" onclick={handleBackClick}>
					<ArrowLeftTwoTone />
				</button>
			</div>
		</div>
		<div class="flex-none text-lg font-semibold">{title}</div>
		<div class="flex-1 text-end">
			<div class="dropdown dropdown-end">
				<div class="tooltip tooltip-bottom" data-tip="Options">
					<button class="btn btn-ghost btn-square" aria-label="Options" tabindex="0">
						<MoreTwoTone />
					</button>
				</div>
				<div
					class="dropdown-content bg-base-100 rounded-box border-base-300 z-1 w-52 border shadow"
					tabindex="0"
					role="listbox"
				>
					<ul class="menu w-full p-2">
						<li role="listitem"><a href="/settings">Settings</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
