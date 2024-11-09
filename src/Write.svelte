<script>
import getData from "./lib/getData";
import Modal from "./lib/Modal.svelte";
import Work from "./lib/Work.svelte";

let currentWork = null;
let data = null;
getData(["WRITE"]).then((d) => (data = d.WRITE));
</script>

{#if currentWork}
    <Modal
        title={currentWork.title}
        smallTitle={currentWork.client}
        tags={currentWork.types}
        url={currentWork.URL}
        content={currentWork.description}
        img={currentWork.thumbnail}
        on:close={() => (currentWork = null)}
    ></Modal>
{/if}
<div class="container">
    <div class="small-title">(Works)</div>
    {#if data}
        <div class="works">
            {#each data as work}
                <Work
                    title={[work.client, work.title]}
                    tags={work.types}
                    thumbnail={work.thumbnail}
                    on:click={() => (currentWork = work)}
                />
            {/each}
            <!-- <div
                    class="add-work"
                    use:hover={"arrow"}
                    use:button
                    on:click
                    tabindex="0"
                    role="button"
                    aria-label="새로운 작업 의뢰"
                >
                    <span>새로운 작업 의뢰</span>
                </div> -->
        </div>
    {:else}
        <div class="loading">LOADING...</div>
    {/if}
</div>

<style>
.desc-zone {
    padding-block: 150px 250px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 80px;
    align-items: center;
}
.desc-title {
    width: 100%;
    font-family: "Noto Serif";
    text-align: center;
    font-size: 35px;
    font-weight: 300;
}
.desc {
    font-family: "Pretend";
    font-weight: 300;
    line-height: 143%;
    letter-spacing: -0.72px;
    font-size: 20px;
    word-break: keep-all;
}
.works {
    display: flex;
    flex-direction: row;
    gap: 30px 20px;
    margin-top: 50px;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.notice {
    font-family: "Pretend";
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.6px;
    text-align: right;
    margin-top: 10px;
}
</style>
