<script>
  // For demonstration, let's use some static data or placeholders
  let greeting = "Welcome to Zip Quran!";
  let description = "Explore the Quran text, search verses, and enrich your faith.";
</script>

<style>
  main {
    max-width: 960px;
    margin: 2rem auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #333;
    padding: 1rem;
  }
  header {
    text-align: center;
    border-bottom: 2px solid #888;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }
  h1 {
    font-size: 2.5rem;
    color: #0b3d91;
    margin: 0;
  }
  p.description {
    font-size: 1.2rem;
    color: #555;
    margin-top: 0.5rem;
  }
  section.features {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .feature-item {
    background: #f2f9ff;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    flex: 1 1 250px;
    box-shadow: 0 3px 6px rgba(11, 61, 145, 0.1);
    transition: box-shadow 0.3s ease;
    cursor: default;
  }
  .feature-item:hover {
    box-shadow: 0 6px 12px rgba(11, 61, 145, 0.2);
  }
  .feature-item h2 {
    margin-top: 0;
    color: #0b3d91;
  }
  .feature-item p {
    color: #444;
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    section.features {
      flex-direction: column;
      text-align: center;
    }
  }
</style>

<main>
  <header>
    <h1>{greeting}</h1>
    <p class="description">{description}</p>
  </header>

  <section class="features">
    <div class="feature-item">
      <h2>Read Quran Text</h2>
      <p>Access the complete Quran text with ease and clarity.</p>
    </div>
    <div class="feature-item">
      <h2>Search Verses</h2>
      <p>Quickly find specific verses and topics within the Quran.</p>
    </div>
    <div class="feature-item">
      <h2>Learn and Reflect</h2>
      <p>Explore detailed tafsir and reflections to deepen understanding.</p>
    </div>
  </section>
</main>
