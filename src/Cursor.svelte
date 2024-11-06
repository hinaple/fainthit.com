<script>
import { blur, fade } from "svelte/transition";
import { cursorStore, descStore } from "./lib/hover";
import { quintInOut } from "svelte/easing";

let mousePos = [0, 0];
function handleMouseMove(evt) {
    mousePos = [evt.clientX, evt.clientY];
}

let currentCursor = "";
cursorStore.subscribe((v) => (currentCursor = v));
let currentDesc = null;
descStore.subscribe((v) => (currentDesc = v));
</script>

<svelte:body on:mousemove={handleMouseMove} />

{#if currentDesc}
    <div
        class="desc"
        class:side={currentCursor.length}
        style={`left: ${mousePos[0]}px; top: ${mousePos[1]}px;`}
    >
        {#if currentDesc.title}
            <div class="desc-title">
                {#if currentDesc.icon}
                    <img class="desc-icon" src={currentDesc.icon} alt="icon" />
                {/if}
                <span>{currentDesc.title}</span>
            </div>
        {/if}
        <div class="desc-content">{currentDesc.content}</div>
    </div>
{/if}
<div
    class="cursor"
    class:big={currentCursor.length}
    style={`left: ${mousePos[0]}px; top: ${mousePos[1]}px;`}
>
    {#if currentCursor === "arrow"}
        <svg width="120" height="120" viewBox="0 0 120 120">
            <path
                d="M60.2493 24.7058L95.7927 60.2492L60.2493 95.7926"
                stroke="black"
            />
            <path d="M95.3793 60.2493L25.5324 60.2493" stroke="black" />
        </svg>
    {:else if currentCursor === "quit"}
        <svg width="73" height="73" viewBox="0 0 73 73" style="padding: 20px;">
            <path d="M72 1L1 72" stroke="black" />
            <path d="M72 72L1 0.999997" stroke="black" />
        </svg>
    {:else if currentCursor === "circle"}
        <div class="circle"></div>
    {/if}
</div>

<style>
.cursor {
    position: fixed;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid #000 1px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(0);
    z-index: 9999;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition:
        width 200ms ease,
        height 200ms ease;
}
.cursor.big {
    width: 80px;
    height: 80px;
    backdrop-filter: blur(5px);
}
svg {
    width: 100%;
    height: 100%;
}
svg * {
    fill: transparent;
    stroke-width: 2px;
}
.circle {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    border-radius: 50%;
    background-color: #000;
    opacity: 0.1;
}
.desc {
    pointer-events: none;
    position: fixed;
    z-index: 9999;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    transform: translate(20px, calc(-100% - 20px));
    max-width: 300px;
    display: flex;
    flex-direction: column;
    font-family: "Pretend";
    gap: 5px;
    word-break: keep-all;
    backdrop-filter: blur(5px);
    border-radius: 5px;
}
.desc.side {
    transform: translate(40px, calc(-100% - 40px));
}
.desc-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    font-size: 20px;
    font-weight: 700;
    align-items: center;
    height: 20px;
}
.desc-icon {
    height: 100%;
    width: auto;
}
.desc-content {
    font-size: 15px;
    font-weight: 500;
}
</style>
