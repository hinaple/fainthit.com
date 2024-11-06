export default (dom) => {
    dom.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") dom.click();
    });
};
