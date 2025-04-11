<script lang="ts">
	import { themeSwitch } from '$lib/theme';
	import { Mode } from '$lib/types/mode';
</script>

<div>
	<div>
		<button class="btn w-full" onclick={() => themeSwitch(Mode.DARK)}>Dark</button>
		<button class="btn w-full" onclick={() => themeSwitch(Mode.LIGHT)}>Light</button>
		<button class="btn w-full" onclick={() => themeSwitch(Mode.AUTO)}>System</button>
	</div>
</div>
