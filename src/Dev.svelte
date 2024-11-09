<script>
import getData from "./lib/getData";
import Modal from "./lib/Modal.svelte";
import Work from "./lib/Work.svelte";

let currentWork = null;
let data = null;
getData(["DEV"]).then((d) => (data = d.DEV));
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
    <div class="desc-zone">
        <div class="desc-title">공간, 그 이상을 그리세요.</div>
        <div class="desc">
            테마와 유기적으로 연동되는 PC 프로그램와 모바일 앱, 현실에 테마의
            세계관을 녹여내는 리얼한 웹사이트, 독보적인 힌트 시스템.<br />
            방탈출에 대한 높은 이해를 바탕으로 상상하시는 모든 소프트웨어를 구현해드립니다.<br
            />
            <br /><br />
            더 이상 플레이어의 상상력을 물리적인 공간 안에 가두지 않아도 됩니다.
        </div>
    </div>
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
        <div class="notice">
            *위 작업물들은 기획 단계에 거의 또는 전혀 참여하지 않았으며 개발
            작업만을 의뢰받아 진행했으므로,<br />
            디자인 및 기획에 대한 저작권은 클라이언트에 있습니다.
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
.add-work {
    width: 300px;
    height: 450px;
    padding: 20px;
    box-sizing: border-box;
    border: solid #000 1px;
    background-color: #fff;
    text-align: right;
    font-family: "Noto Serif";
    font-size: 20px;
    font-weight: 300;
    letter-spacing: -1.2px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    transition: transform 400ms ease;
}
.add-work:hover,
.add-work:focus {
    outline: none;
    transform: translateY(-10px);
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
