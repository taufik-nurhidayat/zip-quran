<script lang="ts">
	import AyahTopBar from './AyahTopBar.svelte';
	import { Tajweed } from '$lib/tajweed';
	import { m } from '$lib/paraglide/messages';
	import type { SurahWithAyahs } from '$lib/types/surah';
	let newTajweed = new Tajweed();
	export let data: {
		surah: SurahWithAyahs;
		translation: SurahWithAyahs;
	};
</script>

<AyahTopBar title={data?.surah?.englishName} />
<div class="pt-20">
	<div class="border-base-300 border-b pb-8 text-center">
		<h1 class="font-ar text-3xl">{data?.surah?.name}</h1>
		<p class="text-base-content/60 mt-1 text-sm">
			{data?.surah?.numberOfAyahs}
			{m.verse()} &bullet; {data?.surah?.englishName} &bullet; {data?.surah?.englishNameTranslation}
		</p>
	</div>
	<div class="divide-base-300 divide-y">
		{#each data?.surah?.ayahs as ayah (ayah.numberInSurah)}
			<div class="py-4">
				<div class="flex">
					<div class="py-2"></div>
					<div class="flex-1">
						<p class="p-2 text-right">
							<span class="font-ar ar-size" dir="rtl">
								{@html newTajweed.parse(ayah.text, true)}
								<span
									class="bg-base-300 inline-flex h-6 w-6 items-center justify-center rounded-full font-sans text-base"
								>
									{ayah.numberInSurah}
								</span>
							</span>
						</p>
					</div>
				</div>
				<div>
					<p>
						{data?.translation?.ayahs.find((t) => t.numberInSurah === ayah.numberInSurah)?.text}
					</p>
					<p class="label">- {data?.translation?.edition?.name}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
