<script>
	import { onMount } from 'svelte';
	import AyahTopBar from './AyahTopBar.svelte';
	import { Tajweed } from 'tajweed';
	import { m } from '$lib/paraglide/messages';
	let newTajweed = new Tajweed();
	let surah = $state();
	let translation = $state();
	onMount(async () => {
		let response = await Promise.all([
			await fetch('https://api.alquran.cloud/v1/surah/1/quran-tajweed').then((r) => r.json()),
			await fetch('https://api.alquran.cloud/v1/surah/1/id.indonesian').then((r) => r.json())
		]);
		console.log(response);
		surah = response[0].data;
		translation = response[1].data;
	});
	// let surah = async () =>
	// 	await fetch('https://api.alquran.cloud/v1/surah/1/quran-tajweed').then((r) => r.json());
</script>

<AyahTopBar title="Al-Fatihah" />
<div class="pt-20">
	<div class="border-base-300 border-b pb-8 text-center">
		<h1 class="font-ar text-3xl">{surah?.name}</h1>
		<p class="text-base-content/60 mt-1 text-sm">
			{surah?.numberOfAyahs}
			{m.verse()} &bullet; {surah?.englishName}
		</p>
	</div>
	<div>
		{#each surah?.ayahs as ayah (ayah.number)}
			<div>
				<div class="flex py-2">
					<div class="py-2"></div>
					<div class="flex-1">
						<p class="p-2 text-right">
							<span
								class="bg-base-300 font- inline-flex h-6 w-6 items-center justify-center rounded-full"
							>
								{ayah.number}
							</span>
							<span class="font-ar ar-size" dir="rtl">
								{@html newTajweed.parse(ayah.text, true)}
							</span>
						</p>
					</div>
				</div>
				<div>
					{translation?.ayahs[ayah.number]?.text}
				</div>
			</div>
		{/each}
		<!-- <p class="ar-size font-ar text-right">
			{@html newTajweed.parse(' ٱللَّهُ نُورُ [h:9421[ٱ][l[ل]سَّمَ[n[ـٰ]و[n[َٲ]', true)}
		</p>
		<p class="font-ar ar-size p-2 text-right">
			{newTajweed.parse('بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ', true)}
		</p> -->
	</div>
</div>
