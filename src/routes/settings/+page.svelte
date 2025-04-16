<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import ThemeChanger from '$lib/components/ThemeChanger.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import { theme } from '$lib/stores/theme';
	import LanguageSquareBold from '$lib/icons/LanguageSquareBold.svelte';
	import ColorSwatchBold from '$lib/icons/ColorSwatchBold.svelte';
	import Warning2Bold from '$lib/icons/Warning2Bold.svelte';
	import LanguageChanger from '$lib/components/LanguageChanger.svelte';
	import AppBar from '$lib/components/AppBar.svelte';

	$: message = m;
</script>

<div>
	<TopBar title="Settings" />
	<div class="space-y-4 pt-16 pb-5">
		<div class="join join-vertical w-full">
			<label class="join-item btn w-full justify-start" for="language_changer">
				<LanguageSquareBold size={20} />
				<span>{message.language()}</span>
			</label>
			<label class="join-item btn w-full justify-start" for="theme_changer">
				<ColorSwatchBold size={20} />
				<span>{m.theme()}</span>
				<span class="ml-auto text-xs font-normal">{$theme}</span>
			</label>
		</div>
		<div class="join join-vertical w-full">
			<button class="join-item btn w-full justify-start">
				<Warning2Bold size={20} />
				<span>{m.about()}</span>
			</button>
		</div>
	</div>
</div>
<ThemeChanger />
<LanguageChanger />
<AppBar />
