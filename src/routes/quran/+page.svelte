<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import LastRead from '$lib/components/LastRead.svelte';

	interface Data {
		surah: {
			number: number;
			englishName: string;
			numberOfAyahs: number;
			englishNameTranslation: string;
		}[];
	}

	export let data: Data;
</script>

<div class="pt-4 pb-20">
	<LastRead />
	<p class="mt-6 text-lg font-semibold">All surah</p>
	<div class="mt-4 space-y-2">
		{#each data.surah as surah (surah.number)}
			<div
				class="hover:bg-base-300 active:bg-base-300 rounded-box border-base-300 bg-base-100 relative border p-4"
			>
				<div class="flex items-center gap-4">
					<div>
						<div class="avatar bg-base-200 rounded-field">
							<div class="w-14 text-lg font-bold">
								<figure class="flex h-full w-full items-center justify-center">
									{surah.number}
								</figure>
							</div>
						</div>
					</div>
					<div class="">
						<h2 class="font-semibold">
							<a href="/quran/{surah.number}" class="stretch-link">{surah.englishName}</a>
						</h2>
						<p class="text-base-content/60 mt-1 text-sm">
							{surah.numberOfAyahs} Ayat &bullet; {surah.englishNameTranslation}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
<AppBar />
