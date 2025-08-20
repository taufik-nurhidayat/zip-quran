<script>
  import AppBar from '$lib/components/AppBar.svelte';
  import LastRead from '$lib/components/LastRead.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Mock data for Quran chapters (simplified for example)
  const chapters = writable([]);
  const searchTerm = writable('');
  const filteredChapters = writable([]);

  onMount(() => {
    // Ideally fetch chapters from API, here mock
    chapters.set([
      { id: 1, name: 'Al-Fatihah', verses: 7 },
      { id: 2, name: 'Al-Baqarah', verses: 286 },
      { id: 3, name: 'Al-' + 'Imran', verses: 200 },
      { id: 4, name: 'An-Nisa', verses: 176 },
      { id: 5, name: 'Al-Ma'idah', verses: 120 },
    ]);

    searchTerm.subscribe((term) => {
      chapters.subscribe((list) => {
        if (!term) {
          filteredChapters.set(list);
        } else {
          const lowered = term.toLowerCase();
          filteredChapters.set(list.filter(c => c.name.toLowerCase().includes(lowered)));
        }
      });
    });
  });

  let localSearch = '';

  function onSearchInput(e) {
    searchTerm.set(e.target.value);
  }
</script>

<style>
  .home-container {
    max-width: 640px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .search-input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .chapter-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  .chapter-item {
    padding: 0.75rem;
    background-color: #f9f9f9;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-align: center;
  }

  .chapter-item:hover, .chapter-item:focus {
    background-color: #e0f0ff;
    outline: none;
  }

  .chapter-name {
    font-weight: 600;
    font-size: 1rem;
  }

  .chapter-verses {
    font-size: 0.85rem;
    color: #666;
  }

  @media (prefers-color-scheme: dark) {
    .home-container {
      color: #eee;
    }
    .chapter-item {
      background-color: #333;
      box-shadow: none;
    }
    .chapter-item:hover, .chapter-item:focus {
      background-color: #004477;
    }
    .chapter-verses {
      color: #bbb;
    }
  }
</style>

<AppBar title="Al Quran" />
<div class="home-container">
  <input
    type="search"
    aria-label="Search Quran chapters"
    placeholder="Search chapters..."
    class="search-input"
    on:input={onSearchInput}
    bind:value={localSearch}
  />

  <LastRead />

  <section aria-label="Quran chapters list" class="chapter-list">
    {#each $filteredChapters as chapter (chapter.id)}
      <button class="chapter-item" on:click={() => alert(`Open chapter ${chapter.name}`)} tabindex="0">
        <div class="chapter-name">{chapter.name}</div>
        <div class="chapter-verses">{chapter.verses} verses</div>
      </button>
    {/each}
  </section>
</div>
