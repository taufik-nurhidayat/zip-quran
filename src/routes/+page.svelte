<script>
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';

  const surahList = writable([]);
  const query = writable('');
  const loading = writable(false);
  const error = writable('');

  const filteredSurahs = derived([surahList, query], ([$surahList, $query]) => {
    const q = $query.trim().toLowerCase();
    if (!q) return $surahList;
    return $surahList.filter(s => s.name.toLowerCase().includes(q) || String(s.number) === q);
  });

  // Example data fallback — in production this would come from a load() function or API
  const defaultSurahs = Array.from({ length: 10 }).map((_, i) => ({
    number: i + 1,
    name: `Surah ${i + 1}`,
    ayahs: (i + 1) * 10
  }));

  onMount(async () => {
    loading.set(true);
    error.set('');
    try {
      // Try to fetch surah list from public API if available (non-blocking)
      const res = await fetch('/api/surahs');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) surahList.set(data);
        else surahList.set(defaultSurahs);
      } else {
        surahList.set(defaultSurahs);
      }
    } catch (e) {
      // If any error occurs, fall back to sensible defaults
      surahList.set(defaultSurahs);
    } finally {
      loading.set(false);
    }
  });

  async function downloadZip(surah) {
    error.set('');
    loading.set(true);
    try {
      // Create an API request to generate or retrieve the zip for the selected surah
      const params = new URLSearchParams({ surah: String(surah.number) });
      const res = await fetch(`/api/zip?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to prepare zip');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `surah-${surah.number}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      error.set(err?.message || 'Download failed');
    } finally {
      loading.set(false);
    }
  }
</script>

<style>
  main { max-width: 960px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
  header { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:1.25rem }
  h1 { font-size:1.5rem; margin:0 }
  .intro { color:#555; font-size:0.95rem }
  .controls { display:flex; gap:.5rem; align-items:center }
  input[type="search"] { padding:.5rem .75rem; border-radius:6px; border:1px solid #ddd; min-width:220px }
  .surah-list { display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap:0.75rem; margin-top:1rem }
  .card { border:1px solid #eee; padding:.75rem; border-radius:8px; background:white; box-shadow:0 1px 2px rgba(0,0,0,0.03); display:flex; flex-direction:column; gap:.5rem }
  .meta { color:#666; font-size:.9rem }
  button.download { margin-top:auto; padding:.5rem .6rem; border-radius:6px; background:#0b74de; color:white; border:none; cursor:pointer }
  button.download[disabled] { opacity:.6; cursor:not-allowed }
  .status { margin-top:.75rem; color:#c33 }
  footer { margin-top:2rem; color:#666; font-size:.85rem; text-align:center }
</style>

<main>
  <header>
    <div>
      <h1>Zip Quran — Download Surah as ZIP</h1>
      <p class="intro">Select a surah to generate a downloadable ZIP containing the audio/text files. Fast, simple, and privacy-friendly.</p>
    </div>
    <div class="controls" role="region" aria-label="homepage controls">
      <label for="search" class="sr-only">Search surah</label>
      <input id="search" type="search" placeholder="Search by name or number" on:input={(e) => query.set(e.target.value)} />
    </div>
  </header>

  {#if $loading}
    <p>Loading surahs...</p>
  {:else}
    {#if $error}
      <div class="status">{$error}</div>
    {/if}

    <section aria-label="surah list">
      <div class="surah-list">
        {#each $filteredSurahs as surah}
          <article class="card" aria-labelledby={`surah-${surah.number}`}>
            <div>
              <strong id={`surah-${surah.number}`}>{surah.name}</strong>
              <div class="meta">Surah {surah.number} &middot; {surah.ayahs} ayah(s)</div>
            </div>
            <div style="display:flex; gap:.5rem; align-items:center; margin-top:.5rem">
              <button class="download" on:click={() => downloadZip(surah)} aria-label={`Download ${surah.name} as zip`}>Download ZIP</button>
              <a href={`/surah/${surah.number}`} aria-label={`Open ${surah.name}`} style="color:#0b74de; text-decoration:none">Open</a>
            </div>
          </article>
        {/each}
      </div>

      {#if $filteredSurahs.length === 0}
        <p>No surahs match your search.</p>
      {/if}
    </section>
  {/if}

  <footer>
    <div>Built with ❤️ — All files are generated on-demand and not stored permanently.</div>
  </footer>
</main>
