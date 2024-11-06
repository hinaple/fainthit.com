import { writable } from "svelte/store";

export default (elm, options) => {
    let targetCursor = "",
        targetDesc = null;
    if (typeof options === "string") targetCursor = options ?? "arrow";
    else if (typeof options === "object") {
        const { cursor = "", desc = null } = options;
        targetCursor = cursor;
        targetDesc = desc;
    }
    let hovering = false;
    elm.addEventListener("mouseenter", () => {
        cursorStore.set(targetCursor);
        if (targetDesc) descStore.set(targetDesc);
        hovering = true;
    });
    elm.addEventListener("mouseleave", () => {
        cursorStore.set("");
        descStore.set(null);
        hovering = false;
    });
    return {
        update(options) {
            if (typeof options === "string") targetCursor = options;
            else if (typeof options === "object") {
                const { cursor = "arrow", desc = null } = options;
                targetCursor = cursor;
                targetDesc = desc;
            }
            if (hovering) {
                cursorStore.set(targetCursor);
                if (targetDesc) descStore.set(targetDesc);
            }
        },
        destroy() {
            if (hovering) cursorStore.set("");
        },
    };
};

export const cursorStore = writable("");
export const descStore = writable(null);
