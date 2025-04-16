<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { setLocale, getLocale } from '$lib/paraglide/runtime';

	let systemLanguage = $state(getLocale());
	let translationLanguage = $state(getLocale());
	let languageChangerModalState = $state(false);
	async function onSave() {
		languageChangerModalState = false;
		setLocale(systemLanguage, {
			reload: false
		});
		invalidate('app:data');
	}
</script>

<input
	bind:checked={languageChangerModalState}
	type="checkbox"
	id="language_changer"
	class="modal-toggle"
/>
<div class="modal modal-bottom sm:modal-middle" role="dialog">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Change language</h3>
		<div class="mt-6">
			<label for="system_language" class="label">System language</label>
			<select bind:value={systemLanguage} id="system_language" class="select mt-2 w-full">
				<option value="id">Indonesia</option>
				<option value="en">English (US)</option>
			</select>
		</div>
		<div class="mt-6">
			<label for="translation_language" class="label">Translation language</label>
			<select bind:value={translationLanguage} id="translation_language" class="select mt-2 w-full">
				<option value="id">Indonesia (Kemenag)</option>
				<option value="id-jalalain">Indonesia (Al-Jalalain)</option>
				<option value="en">English (US)</option>
			</select>
		</div>
		<div class="modal-action">
			<label for="language_changer" class="btn">Cancel</label>
			<button class="btn btn-primary" onclick={onSave}>Save</button>
		</div>
	</div>
	<label class="modal-backdrop" for="language_changer">close</label>
</div>
