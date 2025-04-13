<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<div class="rounded-box bg-primary text-primary-content p-4">
	<div>
		<h3 class="text-sm">{m.last_read()}</h3>
	</div>
	<div class="mt-3">
		<p class="font-semibold">Al Baqarah</p>
		<p class="mt-1 text-sm opacity-80">{m.verse()} 125</p>
	</div>
</div>
