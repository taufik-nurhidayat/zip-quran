
<script>
    import AppBar from '$lib/components/AppBar.svelte';
    import LastRead from '$lib/components/LastRead.svelte';
</script>

<style>
    :global(body) {
        margin: 0;
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        color: #333;
    }
    .container {
        max-width: 960px;
        margin: 0 auto;
        padding: 20px;
    }
    header {
        background-color: #333;
        color: #fff;
        padding: 1rem 0;
        text-align: center;
    }
    header h1 {
        margin: 0;
        font-size: 2.5em;
    }
    nav ul {
        list-style: none;
        padding: 0;
        margin: 10px 0 0;
    }
    nav ul li {
        display: inline;
        margin: 0 15px;
    }
    nav ul li a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
    }
    .hero {
        background-color: #007bff;
        color: #fff;
        text-align: center;
        padding: 50px 20px;
        margin-bottom: 20px;
    }
    .hero h2 {
        font-size: 3em;
        margin-bottom: 10px;
    }
    .hero p {
        font-size: 1.2em;
        line-height: 1.6;
    }
    .section {
        background-color: #fff;
        padding: 30px;
        margin-bottom: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .section h3 {
        color: #007bff;
        font-size: 2em;
        margin-bottom: 15px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
    }
    footer {
        text-align: center;
        padding: 20px;
        background-color: #333;
        color: #fff;
        margin-top: 20px;
    }
</style>

<header>
    <div class="container">
        <h1>Zip Quran</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </div>
</header>

<main class="container">
    <section class="hero">
        <h2>Welcome to Zip Quran</h2>
        <p>Your comprehensive digital companion for daily Quranic readings and studies.</p>
        <p>Explore verses, track your progress, and deepen your understanding.</p>
    </section>

    <section class="section">
        <h3>Continue Your Reading</h3>
        <LastRead />
    </section>

    <section class="section">
        <h3>Quick Navigation</h3>
        <AppBar />
    </section>

    <section class="section">
        <h3>About Zip Quran</h3>
        <p>Zip Quran is designed to provide a seamless and enriching experience for Quran enthusiasts. With an intuitive interface, it helps you keep track of your last read position, navigate through chapters, and access important tools for your spiritual journey.</p>
        <p>Our mission is to make the Holy Quran accessible and easy to engage with for everyone, everywhere.</p>
    </section>
</main>

<footer>
    <div class="container">
        <p>&copy; {new Date().getFullYear()} Zip Quran. All rights reserved.</p>
    </div>
</footer>
