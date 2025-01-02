import * as path from "path"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "load-svg",
      enforce: "pre",
      transform(_, id) {
        if (id.endsWith(".svg")) {
          return "export default () => {}"
        }
      },
    },
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      all: true,
    },
    setupFiles: ["./vitest-setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
