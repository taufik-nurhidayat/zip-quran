<script>
	import AppBar from '$lib/components/AppBar.svelte';
	import LastRead from '$lib/components/LastRead.svelte';
</script>

<div class="pt-4">
	<LastRead />
	<p class="mt-6 text-lg font-semibold">All surah</p>
	<div class="mt-4">
		<div class="rounded-box border-base-300 bg-base-100 relative border p-4">
			<div class="flex items-center gap-4">
				<div class="">
					<div class="avatar bg-base-200 rounded-field">
						<div class="w-14 text-lg font-bold">
							<figure class="flex h-full w-full items-center justify-center">1</figure>
						</div>
					</div>
				</div>
				<div class="">
					<h2 class="font-semibold"><a href="/quran/1"> Surah Al-Fatihah </a></h2>
					<p class="text-base-content/60 mt-1 text-sm">7 Ayat &bullet; The Opening</p>
				</div>
			</div>
		</div>
	</div>
</div>
<AppBar />
