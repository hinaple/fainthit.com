import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte({
            onwarn: (warning, handler) => {
                if (
                    warning.code.startsWith("a11y-") ||
                    warning.code === "node_invalid_placement_ssr"
                )
                    return;
                if (handler) handler(warning);
            },
        }),
    ],
    base: "./",
});
