<script>
import { fade } from "svelte/transition";
import About from "./About.svelte";
import Cursor from "./Cursor.svelte";
import Dev from "./Dev.svelte";
import Title from "./Title.svelte";
import Write from "./Write.svelte";

let currentScreen = "";
</script>

<Cursor />

<div class="container">
    <Title bind:currentScreen />

    {#if currentScreen.length}
        <div class="body" transition:fade={{ duration: 400 }}>
            {#if currentScreen === "About"}
                <About />
            {:else if currentScreen === "Developing"}
                <Dev />
            {:else if currentScreen === "Writing"}
                <Write />
            {/if}
        </div>
    {/if}
</div>

<style>
.container {
    overflow-y: auto;
    width: 100%;
    height: 100%;
}
.body {
    max-width: 1600px;
    margin-inline: auto;
    width: 100%;
    padding: 200px 100px 200px 100px;
    box-sizing: border-box;
}
</style>
