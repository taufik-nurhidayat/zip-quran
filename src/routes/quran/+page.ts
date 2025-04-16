export const load = async ({ fetch }) => {
	const response = await fetch('/quran/surah.json');
	const data = await response.json();
	return { surah: data };
};
