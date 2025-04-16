export const load = async ({ params, fetch }) => {
	const ayah = params.ayah;

	try {
		const [surah, translation] = await Promise.all([
			await fetch(`/quran/quran-tajweed/${ayah}.json`).then((r) => {
				if (!r.ok) throw new Error(`Failed to fetch surah: ${r.status}`);
				return r.json();
			}),
			await fetch(`/quran/id.indonesian/${ayah}.json`).then((r) => {
				if (!r.ok) throw new Error(`Failed to fetch translation: ${r.status}`);
				return r.json();
			})
		]);

		return {
			surah,
			translation
		};
	} catch (error) {
		console.error('Error loading data:', error);
		return {
			error: error instanceof Error ? error.message : 'Unknown error occurred'
		};
	}
};
