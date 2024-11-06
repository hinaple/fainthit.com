<script>
import { fly, scale } from "svelte/transition";
import hover from "./lib/hover";
import { quintIn, quintOut } from "svelte/easing";
import { onMount } from "svelte";

export let currentScreen = "";
let showingIntro = true;

const Btns = ["About", "Developing", "Writing"];

onMount(() => setTimeout(() => (showingIntro = false), 3000));
</script>

<div
    class="title-container"
    class:showFull={!currentScreen.length}
    use:hover={currentScreen.length ? "circle" : ""}
    on:click={() => (currentScreen = "")}
>
    <div class="title">
        <div class="beyond">Beyond</div>
        <div class="space">
            <span><i>Space.</i></span>
        </div>
    </div>
    <div class="btns" class:show={!currentScreen.length && !showingIntro}>
        {#if !currentScreen.length && !showingIntro}
            {#each Btns as b, idx}
                <div
                    class="btn"
                    use:hover={"arrow"}
                    in:fly|global={{
                        duration: 400,
                        easing: quintOut,
                        y: -200,
                        delay: idx * 200,
                    }}
                    out:scale|global={{
                        duration: 400,
                        easing: quintIn,
                        start: 0,
                    }}
                    on:click|stopPropagation={() => (currentScreen = b)}
                >
                    <div class="thumb">{b[0]}</div>
                    <div class="tail">{b.substring(1)}</div>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
.title-container {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 50px 100px 0 100px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    min-height: 0;

    transition: all 1s ease;
}
.title-container.showFull {
    min-height: 100%;
    padding-block: 0;
}
.title {
    width: 100%;
    max-width: 1400px;
    gap: 25px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    z-index: 10;

    animation: size-up 3s ease;
}
.beyond {
    font-family: "HelveticaExt";
    font-weight: 300;
    font-size: 59px;
    flex-shrink: 0;
}
.space {
    font-family: "Noto Serif";
    font-weight: 400;
    background-color: #000;
    color: var(--ivory);
    width: 0;
    font-size: 90px;
    line-height: 1.2em;
    position: relative;
    overflow: hidden;

    animation: show-space 2s 1s ease forwards;
}
.space > span {
    position: relative;
    letter-spacing: -0.03em;
    bottom: 7px;
}
.btns {
    display: flex;
    flex-direction: row;
    gap: 100px;
    height: 0;
    align-items: end;
    overflow: hidden;

    transition: height 400ms ease;
}
.btns.show {
    height: 220px;
}
.btn {
    width: 120px;
    height: 120px;
    border: solid #000 1px;
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    overflow: hidden;

    transition: all 400ms ease;
}
.btn:hover {
    width: 400px;
}
.thumb {
    font-family: "HelveticaExt";
    font-weight: 300;
    font-size: 64px;
}
.tail {
    font-family: "Noto Serif";
    font-size: 48px;
    font-weight: 400;
    transform-origin: bottom;
    transform: skewX(-20deg) translateX(30px);
    max-width: 0;

    transition: all 400ms ease;
}
.btn:hover .tail {
    transform: skewX(-20deg) translateX(-10px);
    max-width: 350px;
}

@keyframes show-space {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}
@keyframes size-up {
    0% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>
