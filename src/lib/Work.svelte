<script>
import button from "./button";
import hover from "./hover";

export let thumbnail = null,
    title = [],
    tags = [];
</script>

<div
    class="work"
    use:hover={"circle"}
    use:button
    on:click
    tabindex="0"
    role="button"
    aria-label={`작업물-${title.join(", ")}`}
>
    <div
        class="img"
        style={thumbnail
            ? `background: url(${thumbnail}) #ccc 50% / cover no-repeat;`
            : "background-color: grey;"}
    ></div>
    <div class="info">
        <div class="title">
            {#each title as t}
                <span>{@html t}</span>
            {/each}
        </div>
        <div class="tags">
            {#each tags as tag}
                <div class="tag">{tag}</div>
            {/each}
        </div>
    </div>
</div>

<style>
.work {
    width: 300px;
    height: 450px;
    border: solid #000 1px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: transform 400ms ease;
}
.work:hover,
.work:focus {
    outline: none;
    transform: translateY(-10px);
}
.img {
    height: 50%;
    flex-shrink: 0;
}
.info {
    height: 50%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;
}
.title {
    flex-shrink: 0;
    font-family: "Noto Serif";
    font-size: 20px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
}
.title > span {
    word-break: keep-all;
}
.title span:first-child {
    font-size: 16px;
    font-weight: 300;
}
</style>
