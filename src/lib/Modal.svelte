<script>
import { createEventDispatcher } from "svelte";
import hover from "./hover";
import button from "./button";
import { fade, scale } from "svelte/transition";
import { quintOut } from "svelte/easing";
const dispatch = createEventDispatcher();

export let title = "",
    smallTitle = "",
    tags = [],
    url = null,
    content = null,
    img = null;

function keyHandle(evt) {
    if (evt.key === "Escape") dispatch("close");
}
function close() {
    dispatch("close");
}
</script>

<svelte:body on:keydown={keyHandle} />
<div class="modal-container">
    <div
        class="modal-bg"
        on:click={close}
        use:hover={"quit"}
        transition:fade={{ duration: 100 }}
    ></div>
    <div
        class="modal"
        transition:scale={{ duration: 300, easing: quintOut, start: 0.95 }}
    >
        <div class="top">
            <div class="small-title">{smallTitle}</div>
            <div class="close" use:hover={"quit"} on:click={close}>
                <svg width="73" height="73" viewBox="0 0 73 73" fill="none">
                    <path d="M72 1L1 72" stroke="black" />
                    <path d="M72 72L1 0.999997" stroke="black" />
                </svg>
            </div>
        </div>
        <div class="body">
            <div class="title">{@html title}</div>
            <div class="tags">
                {#each tags as tag}
                    <div class="tag">{tag}</div>
                {/each}
            </div>
            {#if img}
                <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <img
                    class:url
                    src={img}
                    alt={title}
                    draggable="false"
                    on:click={url ? () => window.open(url, "_blank") : null}
                    tabindex="0"
                    use:hover={url ? "arrow" : ""}
                    use:button
                />
                {#if url}
                    <div class="guide">이미지 클릭해서 접속하기</div>
                {/if}
            {/if}
            <div class="content">{@html content}</div>
        </div>
    </div>
</div>

<style>
.modal-container {
    position: fixed;
    z-index: 11;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.modal-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    left: 0;
    top: 0;
}
.modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--ivory);
    padding: 40px;
    box-sizing: border-box;
    width: calc(100% - 100px);
    max-width: 1000px;
    max-height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}
.top {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.body {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: auto;
    width: 100%;
    align-items: center;
}
.small-title {
    font-family: "Noto Serif";
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -1.2px;
    text-align: left;
}
.close {
    width: 40px;
    height: 40px;
}
.close > svg {
    width: 100%;
    height: 100%;
}
.title {
    text-align: center;
    font-family: "Noto Serif";
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -2px;
}
.tags {
    justify-content: center;
}
img {
    max-width: 100%;
    max-height: 450px;
    width: auto;
    height: auto;
    margin-top: 10px;
    transition: transform 300ms ease;
}
img.url:hover,
img.url:focus {
    transform: scale(98%);
}
.guide {
    color: #000;
    text-align: center;
    font-family: "Pretend";
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.45px;
    opacity: 0.7;
}
.content {
    width: 100%;
    margin-top: 20px;
    color: #000;
    font-family: "Pretend";
    font-size: 20px;
    font-weight: 300;
    line-height: 143%;
    letter-spacing: -0.72px;
    max-height: 100px;
}
</style>
