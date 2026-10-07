import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.js",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "viora.js" : "viora.cjs"),
      cssFileName: "viora",
    },
    rollupOptions: {
      external: ["react", "react-dom", /^react\//, /^react-dom\//],
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: "esbuild",
  },
});
