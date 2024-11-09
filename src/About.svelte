<script>
import { onDestroy, tick } from "svelte";
import getData from "./lib/getData";
import hover from "./lib/hover";

let data = null;
let barCovers = [];
getData(["STACK", "CONTACT"]).then(async (d) => {
    data = d;
    barCovers = new Array(d.STACK.length);
    await tick();
    barCovers.forEach((c) => {
        observer.observe(c);
    });
});

let observer = new IntersectionObserver((evt) => {
    evt.forEach((i) => {
        // @ts-ignore
        i.target.style.width = i.isIntersecting ? "var(--cover)" : "100%";
    });
});

onDestroy(() => observer.disconnect());
</script>

<div class="container">
    <div class="name">
        <div class="eng">Park Siwon</div>
        <div class="kor">박시원</div>
        <div class="hr"></div>
    </div>
    <div class="jobs">
        <div class="job">
            <div class="eng">Software Developer</div>
            <div class="kor">소프트웨어 개발자</div>
        </div>
        <div class="pole"></div>
        <div class="job">
            <div class="eng">Escape Game Writer</div>
            <div class="kor">방탈출 작가</div>
        </div>
    </div>
    <div class="links">
        {#if data}
            {#each data.CONTACT as contact}
                <div
                    class="contact"
                    use:hover={{
                        cursor: "arrow",
                        desc: {
                            title:
                                contact.type === "url"
                                    ? "눌러서 접속"
                                    : "눌러서 복사",
                            content: contact.data,
                        },
                    }}
                    on:click={() => {
                        if (contact.type === "url")
                            window.open(contact.data, "_blank");
                        else navigator.clipboard.writeText(contact.data);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="34"
                        viewBox="0 0 33 34"
                        fill="none"
                    >
                        <path
                            d="M22.1334 18.719L28.6611 12.1913C30.7213 10.1312 30.6759 6.74568 28.5598 4.62959C26.4437 2.51351 23.0582 2.46813 20.9981 4.52823L15.4029 10.1235"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M17.0011 23.8765L11.4059 29.4718C9.34577 31.5319 5.9603 31.4865 3.84421 29.3704C1.72812 27.2543 1.68274 23.8688 3.74285 21.8087L10.2706 15.281"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M14.5719 18.6178C16.6879 20.7339 20.0734 20.7793 22.1335 18.7192"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M17.9338 15.2808C15.8177 13.1647 12.4322 13.1194 10.3721 15.1795"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span>{contact.label}</span>
                </div>
            {/each}
        {/if}
    </div>
    <hr />
    <div class="small-title">(Tech Stacks)</div>
    {#if data}
        <table class="stacks">
            {#each data.STACK as stack, i}
                <tr
                    class:hover={stack.description}
                    use:hover={{
                        desc: stack.description
                            ? {
                                  title: stack.name,
                                  content: stack.description,
                                  icon: stack.icon,
                              }
                            : null,
                    }}
                >
                    <td>{stack.name}</td>
                    <td>
                        <div class="process-bar">
                            <div
                                class="bar-veil"
                                style={`--cover: ${100 - stack.percentage}%;`}
                                bind:this={barCovers[i]}
                            ></div>
                        </div>
                    </td>
                    <td>{stack.percentage}%</td>
                </tr>
            {/each}
        </table>
    {:else}
        <div class="loading">LOADING...</div>
    {/if}
</div>

<style>
.container {
    --grad: linear-gradient(
        90deg,
        #1b284f 3%,
        #6bc6d6 41%,
        #295daa 51%,
        #f08719 85.71%
    );
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 60px;
}
.name {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    font-family: "Pretend";
    box-sizing: border-box;
    margin-block: 70px 40px;
}
.eng {
    font-size: 55px;
    font-weight: 700;
    letter-spacing: -1.92px;
}
.kor {
    margin-top: -3px;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: -1.08px;
}
.name > .eng,
.name > .kor {
    padding-right: 30px;
}
.hr {
    margin-top: 40px;
    width: 100%;
    height: 10px;
    background: var(--grad);
}
.jobs {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100px;
}
.job {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Pretend";
    justify-content: center;
}
.job > .eng {
    font-size: 38px;
    font-weight: 500;
    letter-spacing: -1.44px;
}
.job > .kor {
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -1.08px;
    margin-top: 0px;
}
.pole {
    width: 1px;
    height: 100%;
    flex-shrink: 0;
    background-color: #000;
    transform: rotate(45deg);
}
.links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px 28px;
}
.contact {
    display: flex;
    padding: 6px 20px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    font-family: "Pretend";
    font-size: 25px;
    font-weight: 500;
    letter-spacing: -1.6px;
    box-sizing: border-box;
    border-radius: 42px;
    border: 1px solid #000;
}
.contact > svg {
    height: 24px;
    width: auto;
}
hr {
    width: 100%;
    border-width: 1px;
    border-color: #000;
    margin-bottom: 20px;
}
.stacks {
    width: 100%;
    max-width: 1000px;
    border-collapse: collapse;
    font-family: "Pretend";
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.72px;
}
.stacks tr {
    border-top: solid #000 1px;
    transition: all 200ms ease;
}
.stacks tr.hover:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px;
    background-color: #fff;
    transform: scale(102%);
}
.stacks tr:last-child {
    border-bottom: solid #000 1px;
}
.stacks td {
    padding: 12px 20px;
    text-align: center;
}
.stacks td:nth-child(2) {
    width: 100%;
}
.process-bar {
    width: 100%;
    height: 16px;
    border: solid #000 1px;
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    background: var(--grad);
}
tr.hover:hover .bar-veil {
    background-color: #fff;
}
.bar-veil {
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    background-color: var(--ivory);
    transition:
        width 500ms ease-out,
        background-color 200ms ease;
}
</style>
